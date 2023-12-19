import React, { useRef, useState, KeyboardEvent } from "react";
import Button from "./Button";
import { FilterValuesType } from "./App";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type TodoListPropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskId: string) => void;
    changeTodoListFilter: (filterValue: FilterValuesType) => void;
    addTask: (title: string) => void;
};

const TodoList = ({
    title,
    tasks,
    removeTask,
    changeTodoListFilter,
    addTask
}: TodoListPropsType) => {
    console.log("Todo")

    // State для input
    const [taskTitle, setTaskTitle] = useState("")

    // Сохраняем input и перерисовываем - useRef
    const listItems: Array<JSX.Element> = tasks.map((task: TaskType) => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <Button title={"x"} onClickHandler={() => removeTask(task.id)} />
            </li>
        )
    })

    // Переменная для отображения УСЛОВНОГО РЕНДЕРИНГа. Если задачи есть, но мы их скрыли фильтрами, то одно, а если здаач нет вовсе - напишем задач нет. Вставим в ul то, что ранее было в переменной listItems -  map массива. И вставим эту переменную в окончательный JSX код
    const tasksList: JSX.Element = tasks.length !== 0
        ? <ul> {listItems} </ul>
        : <span>Tasks list is empty</span>;

    // const onChangeSetTaskTitle = 

    // Обработчик для addTask
    const addTaskOnClickHandler = () => {
        // Проверка на наличие пробелов
        const trimmedTaskTitle = taskTitle.trim()
        if (trimmedTaskTitle) {
            addTask(taskTitle)
        } else {
            alert("У тебя одни пробелы")
        }
        setTaskTitle("")
    }
    // Обработчик для addTask по нажатию Enter. Когда выносим -- ОБЯЗАТЕЛЬНО KeyBoardEvent<HTMLInputElement> + import из react
    const addTaskKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && taskTitle) {
            addTaskOnClickHandler()
        }
    }

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input
                    value={taskTitle}
                    onChange={(e) => {
                        setTaskTitle(e.currentTarget.value)
                    }}
                    onKeyDown={addTaskKeyDownHandler}
                />
                <Button title="+" onClickHandler={addTaskOnClickHandler} isDisabled={!taskTitle} />
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
