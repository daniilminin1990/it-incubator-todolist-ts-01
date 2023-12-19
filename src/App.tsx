import React, { useState } from "react";
import "./App.css";
import TodoList, { TaskType } from "./TodoList";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
    const todoListTitle: string = "What to learn";

    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: "HTML", isDone: true },
        { id: v1(), title: "CSS", isDone: true },
        { id: v1(), title: "ES6/TS", isDone: false },
        { id: v1(), title: "REACT", isDone: false },
    ]);

    // Стейт для фильтрации. В нем используем filter (новые отрисованные active/complete/active tasks)
    const [filterValue, setFilterValue] = useState<FilterValuesType>("all");

    // Функция для удаления задачи по taskId
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter((t) => t.id !== taskId));
    };

    //  Функция добавления залачи
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            // title
            isDone: false,
        };
        const nextState: Array<TaskType> = [newTask, ...tasks];
        setTasks(nextState);
        // или в ордну строку
        // setTasks([{id: v1(),title: title,isDone: false,}, ...tasks])
    };

    // Функция для изменения статуса задачи
    const changeTodoListFilter = (filterValue: FilterValuesType) => {
        setFilterValue(filterValue);
    };

    // Функция для фильтрации задачи, где filter будет = условию
    const getFilterdTasks = (tasks: Array<TaskType>, filterValue: FilterValuesType): Array<TaskType> => {
        return filterValue === "active"
            ? tasks.filter((t) => t.isDone === false)
            : filterValue === "completed"
                ? tasks.filter((t) => t.isDone === true)
                : tasks;
    };
    const filteredTasks = getFilterdTasks(tasks, filterValue);

    // В пропс передаем filteredTasks, потому что обычные tasks нам не нужны, т.к. они не будут фильтроваться. А фильтруются таски у нас в функции getFilterdTasks, которые мы положили в переменную filteredTasks
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
