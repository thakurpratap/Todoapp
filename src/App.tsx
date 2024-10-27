import React from "react";
import "./App.css";
import Board from "./components/Boards/Board";

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="app_navbar">
        <h2>Kanban TODO App</h2>
      </div>
      <div className="app_outer">
        <div className="app_boards">
          <Board />
        </div>
      </div>
    </div>
  );
};

export default App;
