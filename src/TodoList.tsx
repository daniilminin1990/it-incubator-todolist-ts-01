import React from "react";
import Button from "./Button";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: number) => void;
  changeTodoListFilter: (filterValue: FilterValuesType) => void;
};

const TodoList = ({ title, tasks, removeTask, changeTodoListFilter }: TodoListPropsType) => {
  // const listItems: Array<JSX.Element> = [];

  // for (let i = 0; i < tasks.length; i++) {
  //   const listItem: JSX.Element = (
  //     <li>
  //       <input type="checkbox" checked={tasks[i].isDone} />
  //       <span>{tasks[i].title}</span>
  //       <button onClick={() => removeTask(tasks[i].id)}> x </button>
  //     </li>
  //   );
  //   listItems.push(listItem);
  // }

  // const listItems: Array<JSX.Element> = tasks.map((task: TaskType) => {
  //   return (
  //     <li key={task.id}>
  //       <input type="checkbox" checked={task.isDone} />
  //       <span>{task.title}</span>
  //       <Button title={"x"} onClickHandler={() => removeTask(task.id)} />
  //     </li>
  //   );
  // });

  // Переменная для отображения УСЛОВНОГО РЕНДЕРИНГа. Если задачи есть, но мы их скрыли фильтрами, то одно, а если здаач нет вовсе - напишем задач нет. Вставим в ul то, что ранее было в переменной listItems -  map массива. И вставим эту переменную в окончательный JSX код
  const tasksList: JSX.Element =
    tasks.length !== 0 ? (
      <ul>
        {tasks.map((task: TaskType) => {
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />
              <span>{task.title}</span>
              <Button title={"x"} onClickHandler={() => removeTask(task.id)} />
            </li>
          );
        })}
      </ul>
    ) : (
      <span>Tasks list is empty</span>
    );

  return (
    <div className="todolist">
      <h3>{title}</h3>
      <div>
        <input />
        <Button title="+" />
      </div>
      {tasksList}
      <div>
        <Button title="All" onClickHandler={() => changeTodoListFilter("all")} />
        <Button title="Active" onClickHandler={() => changeTodoListFilter("active")} />
        <Button title="Completed" onClickHandler={() => changeTodoListFilter("completed")} />
      </div>
    </div>
  );
};

export default TodoList;
