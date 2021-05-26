import React, { FC, FormEvent, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

//type references another type so this form element is already type over here.
// but interface creates a completely new type but it is not reference in one already exist.
type FormElement = FormEvent<HTMLFormElement>;

interface ITodo {
  text: string;
  complete: boolean;
}

interface ITodo2 extends ITodo {
  tags: string[];
}

// interface TodoArray extends Array<ITodo> {}

const App: FC = () => {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  const addTodo = (text: string) => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };

  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  const completeTodo = (index: number): void => {
    // const updatedTodos: ITodo[] = todos.map((e: ITodo, i: number) => {
    //   return i === index ? { ...e, complete: true } : e;
    // });
    // setTodos(updatedTodos);
    const newTodos: ITodo[] = [...todos];
    newTodos[index].complete = true;
    setTodos(newTodos);
  };

  const removeTodo = (index: number): void => {
    const newTodos = todos.filter((e: ITodo, i: number) => {
      return i === index ? null : e;
    });
    setTodos(newTodos);
  };

  return (
    <>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setValue(e.target.value)}
          type="text"
          required
          value={value}
        />
        <button type="submit">Add todo</button>
      </form>
      <section>
        {todos.map((todo: ITodo, index: number) => {
          return (
            <div style={{ display: "flex" }}>
              <p key={index}>{todo.text}</p>
              <p style={{ marginLeft: 20 }}>{todo.complete ? "done" : "no"}</p>
              {!todo.complete && (
                <button onClick={() => completeTodo(index)}>bas banaa</button>
              )}
              <button onClick={() => removeTodo(index)}>sill</button>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default App;
