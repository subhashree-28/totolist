import React, { createContext, useContext, useReducer } from "react";
import "./todolist.css";
import { Action, State } from "./types";
import _ from "lodash";
import produce from "immer";

const initialState: State = {
  input: "",
  inputArray: [],
  open: false,
  filteredItem: [],
};

const reducer = produce((state: State, action: Action) => {
  switch (action.type) {
    case "set_input":
      state.input = action.payload;
      break;

    case "add_item":
      const Todo = { text: state.input, completed: false };
      state.inputArray = [...state.inputArray, Todo];
      state.input = "";
      state.filteredItem = [...state.inputArray];
      break;

    case "checkbox_status":
      const filter_array = _.map(state.inputArray, (item, i) =>
        i === action.payload ? { ...item, completed: !item.completed } : item
      );
      state.inputArray = filter_array;
      state.filteredItem = filter_array;
      break;

    case "open":
      state.open = !state.open;
      break;

    case "filter":
      switch (action.payload) {
        case "all":
          state.filteredItem = state.inputArray;
          break;
        case "active":
          state.filteredItem = _.filter(state.inputArray, (i) => !i.completed);
          break;
        case "completed":
          state.filteredItem = _.filter(
            state.inputArray,
            (i) => i.completed === true
          );
      }
      break;

    case "clear_completed":
      const delete_item = _.filter(state.inputArray, (item) => !item.completed);
      state.inputArray = delete_item;
      state.filteredItem = delete_item;
  }
});

// case "all":
//   return { ...state, filteredItem: action.payload };

// case "active":
//   return { ...state, filteredItem: action.payload };

// case "completed":
//   return { ...state, filteredItem: action.payload };

function Options() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInput = (e: any) => {
    dispatch({ type: "set_input", payload: e.target.value });
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      dispatch({ type: "add_item" });
    }
  };

  const handleCheckBox = (index: number) => {
    dispatch({ type: "checkbox_status", payload: index });
  };

  const open = () => {
    dispatch({ type: "open" });
  };

  const all = () => {
    dispatch({ type: "filter", payload: "all" });
  };

  const active = () => {
    dispatch({ type: "filter", payload: "active" });
  };

  const completed = () => {
    dispatch({ type: "filter", payload: "completed" });
  };

  const clear = () => {
    dispatch({
      type: "clear_completed",
    });
  };

  const activeCount = _.filter(
    state.inputArray,
    (item) => !item.completed
  ).length;

  return (
    <div>
      <div className="textbox">
        <input
          className="entering_text"
          placeholder="What needs to be done?"
          type="text"
          value={state.input}
          onKeyDown={handleKeyDown}
          onChange={handleInput}
          onClick={open}
        />
      </div>
      {state.open && (
        <div className="add">
          {_.map(state.filteredItem, (input: any, index: number) => (
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
            <button className="input_length">{activeCount} items left!</button>
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

export default function Todolist() {
  return (
    <div className="todo-container">
      <h3>todos</h3>
      <Options />
    </div>
  );
}
