import React, { useState } from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Task from "../Cards/Card";
import TaskForm from "../Forms/Form";
import Modal from "react-modal";
import { Task as TaskType } from "../types";
import { Button, TextField } from "@mui/material";

Modal.setAppElement("#root");

const Board: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [currentTask, setCurrentTask] = useState<TaskType | null>(null);

  const addTask = (newTask: TaskType) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const openModal = (task: TaskType) => {
    setCurrentTask(task);
    setCurrentTaskId(task.id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentTaskId(null);
    setCurrentTask(null);
  };

  const handleEditTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTask) return;

    const updatedTasks = tasks.map((task) =>
      task.id === currentTaskId
        ? {
            ...task,
            title: currentTask.title,
            description: currentTask.description,
          }
        : task
    );
    setTasks(updatedTasks);
    closeModal();
  };

  const moveTask = (id: string, status: "TODO" | "DOING" | "DONE") => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <TaskForm addTask={addTask} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "95%",
          height: "100vh",
        }}
      >
        {["TODO", "DOING", "DONE"].map((status) => (
          <Column
            key={status}
            status={status as "TODO" | "DOING" | "DONE"}
            tasks={tasks.filter((task) => task.status === status)}
            moveTask={moveTask}
            deleteTask={deleteTask} // Pass delete function
            openModal={openModal} // Pass open modal function
          />
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Task"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <h2>Edit Card</h2>
        {currentTask && (
          <form onSubmit={handleEditTask}>
            <TextField
              fullWidth
              placeholder="Edit Title"
              value={currentTask.title}
              onChange={(e) =>
                setCurrentTask({ ...currentTask, title: e.target.value })
              }
              required
            />
            <TextField
              fullWidth
              placeholder="Edit Description"
              value={currentTask.description}
              onChange={(e) =>
                setCurrentTask({ ...currentTask, description: e.target.value })
              }
              required
            />
            <div style={{ justifyContent: "space-between", display: "flex" }}>
              <Button type="button" variant="contained" onClick={closeModal}>
                Close
              </Button>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </DndProvider>
  );
};

const Column: React.FC<{
  status: "TODO" | "DOING" | "DONE";
  tasks: TaskType[];
  moveTask: (id: string, status: "TODO" | "DOING" | "DONE") => void;
  deleteTask: (id: string) => void;
  openModal: (task: TaskType) => void;
}> = ({ status, tasks, moveTask, deleteTask, openModal }) => {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item: { id: string }) => moveTask(item.id, status),
  });

  return (
    <div
      ref={drop}
      style={{
        width: "30%",
        padding: "10px",
        backgroundColor: "beige",
        height: "70%",
        overflowY: "auto",
      }}
    >
      <h2>{status}</h2>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onClick={() => openModal(task)}
          onDelete={() => deleteTask(task.id)}
        />
      ))}
    </div>
  );
};

export default Board;
