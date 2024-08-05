import React, { useState, useEffect, createContext, useContext } from "react";
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

interface AppContextProps {
  input: string;
  setInput: (input: string) => void;
  inputArray: Todo[];
  setInputArray: (inputArray: Todo[]) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  filteredItem: Todo[];
  setFilteredItem: (filteredItem: Todo[]) => void;
  handleInput: (e: any) => void;
  handleKeyDown: (e: any) => void;
  handleCheckBox: (index: number) => void;
  all: () => void;
  completed: () => void;
  active: () => void;
  clear: () => void;
  active_count: number;
}

const AppContext = createContext<AppContextProps | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

const App = () => {
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

  const all = () => {
    setFilteredItem(inputArray);
  };

  const completed = () => {
    setFilteredItem(inputArray.filter((i) => i.completed === true));
  };

  const active = () => {
    setFilteredItem(inputArray.filter((i) => !i.completed));
  };

  const clear = () => {
    const deleteItems = inputArray.filter((item) => !item.completed);
    setInputArray(deleteItems);
  };

  const active_count = inputArray.filter((item) => !item.completed).length;

  return (
    <AppContext.Provider
      value={{
        input,
        setInput,
        inputArray,
        setInputArray,
        open,
        setOpen,
        filteredItem,
        setFilteredItem,
        handleInput,
        handleKeyDown,
        handleCheckBox,
        all,
        completed,
        active,
        clear,
        active_count,
      }}
    >
      <Todolist />
    </AppContext.Provider>
  );
};

function Options() {

  const {
    input,
    setInput,
    inputArray,
    setInputArray,
    open,
    setOpen,
    filteredItem,
    setFilteredItem,
    handleInput,
    handleKeyDown,
    handleCheckBox,
    all,
    completed,
    active,
    clear,
    active_count
  } = useAppContext();

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
          {filteredItem.map((input: any, index: any) => (
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
            <button className="input_length">{active_count} items left!</button>
            <button className="all_button" onClick={all}>
              All
            </button>
            <button className="active_button" onClick={active}>
              Active
            </button>
            <button className="completed_button" onClick={completed}>
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
