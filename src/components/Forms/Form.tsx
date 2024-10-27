import React, { useState } from "react";
import { Task as TaskType } from "../types";
import { Box, Button, TextField } from "@mui/material";

interface TaskFormProps {
  addTask: (task: TaskType) => void;
}

const Form: React.FC<TaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: TaskType = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      status: "TODO",
    };
    addTask(newTask);
    setTitle("");
    setDescription("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        gap: "20px",
        alignItems: "flex-start",
        marginBottom: "20px",
      }}
    >
      <TextField
        sx={{ width: "30%", background: "white" }}
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        sx={{ width: "30%", background: "white" }}
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Button
        variant="contained"
        type="submit"
        sx={{ padding: "15px", width: "15%" }}
      >
        Add Task
      </Button>
    </Box>
  );
};

export default Form;
