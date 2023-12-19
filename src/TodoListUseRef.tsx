import React, { useRef } from "react";
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

    // Сохраняем input и перерисовываем - useRef
    const taskTitleInput = useRef<HTMLInputElement>(null)

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

    // Обработчик для addTask
    const addTaskHandler = () => {
        if (taskTitleInput.current) {
            const newTaskTitle = taskTitleInput.current.value
            addTask(newTaskTitle)
            taskTitleInput.current.value = ""
        }
    }
    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input ref={taskTitleInput} />
                <Button title="+" onClickHandler={addTaskHandler} />
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
