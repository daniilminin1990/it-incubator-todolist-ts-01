import React, { useState } from "react";
import "./App.css";
import TodoList, { TaskType } from "./TodoList";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  const todoListTitle: string = "What to learn";

  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: 1, title: "HTML", isDone: true },
    { id: 2, title: "CSS", isDone: true },
    { id: 3, title: "ES6/TS", isDone: false },
    { id: 4, title: "REACT", isDone: false },
  ]);

  // todo Стейт для фильтрации. В нем используем filter (новые отрисованные active/complete/active tasks)
  const [filterValue, setFilterValue] = useState<FilterValuesType>("all");

  // todo Функция для удаления задачи по taskId
  const removeTask = (taskId: number) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  // todo Функция для изменения статуса задачи
  const changeTodoListFilter = (filterValue: FilterValuesType) => {
    setFilterValue(filterValue);
  };

  // todo Функция для фильтрации задачи, где filter будет = условию
  // const tasksForTodoList = filterValue === "active"
  //     ? tasks.filter((t) => t.isDone === false)
  //     : filterValue === "completed"
  //       ? tasks.filter((t) => t.isDone === true)
  //       : tasks;
  // Или так --
  const getFilterdTasks = (tasks: Array<TaskType>, filterValue: FilterValuesType): Array<TaskType> => {
    return filterValue === "active"
      ? tasks.filter((t) => t.isDone === false)
      : filterValue === "completed"
      ? tasks.filter((t) => t.isDone === true)
      : tasks;
  };
  // Результат положим в переменную
  const filteredTasks = getFilterdTasks(tasks, filterValue);

  // ! В пропс передаем filteredTasks, потому что обычные tasks нам не нужны, т.к. они не будут фильтроваться. А фильтруются таски у нас в функции getFilterdTasks, которые мы положили в переменную filteredTasks
  return (
    <div className="App">
      <TodoList title={todoListTitle} tasks={filteredTasks} removeTask={removeTask} changeTodoListFilter={changeTodoListFilter} />
    </div>
  );
}

export default App;
