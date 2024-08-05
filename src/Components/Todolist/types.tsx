export interface Todo {
  text: string;
  completed: boolean;
}

export interface State {
  input: string;
  inputArray: Todo[];
  open: boolean;
  filteredItem: Todo[];
}

export type Action =
  | { type: "set_input"; payload: string }
  | { type: "add_item" }
  | { type: "checkbox_status"; payload: number }
  | { type: "open" }
  | { type: "filter"; payload: string }
  | { type: "clear_completed" };
  // | { type: "all"; payload: Todo[] }
  // | { type: "active"; payload: Todo[] }
  // | { type: "completed"; payload: Todo[] }
  
