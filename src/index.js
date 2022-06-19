import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

let id = 1;

const TodoList = (props) => (
  <div>
    <span>
      <input
        type="checkbox"
        onChange={props.toggle}
        checked={props.todo.checked}
      />
    </span>
    <span>
      <button onClick={props.delete}>Delete</button>
    </span>
    <span> {props.todo.text} </span>
  </div>
);

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todo: [] };
  }

  addTodoItem() {
    const text = prompt("Add todo item text");
    this.setState({
      todo: [...this.state.todo, { id: id++, text: text, checked: false }]
    });
  }

  deleteTodoItem(id) {
    if (!id) return;
    this.setState({
      todo: this.state.todo.filter((item) => item.id !== id)
    });
  }

  onToggle(id) {
    if (!id) return;
    this.setState({
      todo: this.state.todo.map((item) => {
        if (item.id !== id) return item;
        return {
          id: item.id,
          text: item.text,
          checked: !item.checked
        };
      })
    });
  }

  completedTodoCount() {
    let count = 0;
    this.state.todo.forEach((item) => {
      if (item.checked) {
        return count++;
      }
    });
    return count;
  }

  render() {
    return (
      <div>
        Total todo count : {this.state.todo.length}
        <br />
        Total completed todo count: {this.completedTodoCount()} <br />
        <button onClick={() => this.addTodoItem()}>Add TODO</button>
        <ul>
          {this.state.todo.map((item) => (
            <li>
              <TodoList
                toggle={() => this.onToggle(item.id)}
                delete={() => this.deleteTodoItem(item.id)}
                todo={item}
              />
            </li>
          ))}
        </ul>
        <span> {JSON.stringify(this.state.todo)}</span>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Todo />
  </StrictMode>
);
