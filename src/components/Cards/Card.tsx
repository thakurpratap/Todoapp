import React from "react";
import { useDrag } from "react-dnd";
import { Task as TaskType } from "../types";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearIcon from "@mui/icons-material/Clear";

interface TaskProps {
  task: TaskType;
  onClick: () => void;
  onDelete: () => void;
}

const Card: React.FC<TaskProps> = ({ task, onClick, onDelete }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const getColor = (status: string) => {
    switch (status) {
      case "TODO":
        return "#eded47a1";
      case "DOING":
        return "#7b7bdf";
      case "DONE":
        return "#76db76";
      default:
        return "white";
    }
  };

  return (
    <div
      ref={drag}
      style={{
        backgroundColor: getColor(task.status),
        // border: '1px solid black',
        borderRadius: "20px",
        padding: "10px",
        margin: "5px",
        cursor: "grab",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <ClearIcon
        onClick={onDelete}
        style={{ cursor: "pointer", float: "right" }}
      />
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="card_footer">
        <p>
          <AccessTimeIcon />
          24th Oct
        </p>
        <p>
          <VisibilityIcon onClick={onClick} />
        </p>
      </div>
    </div>
  );
};

export default Card;
