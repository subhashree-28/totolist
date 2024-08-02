import React, { useState, useEffect } from "react";
import "./todolist.css";

export default function Todolist() {
  return (
    <div className="todo-container">
      <h3>todos</h3>
      <Options />
    </div>
  );
}

interface Todo {
  text: string;
  completed: boolean;
}

function Options() {
  const [input, setInput] = useState("");
  const [inputArray, setInputArray] = useState<Todo[]>([]);
  const [open, setOpen] = useState(false);
  const [filteredItem, setFilteredItem] = useState<Todo[]>([]);

  useEffect(() => setFilteredItem(inputArray), [inputArray]);

  const handleInput = (e: any) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      const Todo = { text: input, completed: false };
      setInputArray((prev) => [...prev, Todo]);
      setInput((prev) => (prev = ""));
    }
  };

  const handleCheckBox = (index: number) => {
    setInputArray((inputArray) =>
      inputArray.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completed = () => {setFilteredItem(inputArray.filter((i) => i.completed === true))};

  const active = () => {setFilteredItem(inputArray.filter((i) => !i.completed))};
  const all = () => {setFilteredItem(inputArray)};

  const clear = () => {
    const deleteItems = inputArray.filter((item) => !item.completed);
    setInputArray(deleteItems);
  };

  const activeCount = inputArray.filter((item) => !item.completed).length;
 
  return (
    <div>
      <div className="textbox">
        <input
          className="entering_text"
          placeholder="What needs to be done?"
          type="text"
          value={input}
          onKeyDown={handleKeyDown}
          onChange={handleInput}
          onClick={() => setOpen(!open)}
        />
      </div>
      {open && (
        <div className="add">
          {filteredItem.map((input, index) => (
            <div className="input-item" key={index}>
              <input
                type="checkbox"
                className="border"
                checked={input.completed}
                onChange={() => handleCheckBox(index)}
              />
              {input.text}
            </div>
          ))}
          <div className="buttons">
            <button className="input_length">
              {activeCount} items left!
            </button>
            <button className="all_button" onClick={all}>All</button>
            <button
              className="active_button"
              onClick={active}
            >
              Active
            </button>
            <button
              className="completed_button"
              onClick={completed}
            >
              Completed
            </button>
            <button className="clear_button" onClick={clear}>
              Clear Completed
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
