import React, { useState } from "react";
import { atom, useSetRecoilState, useRecoilValue } from "recoil";

type TodoItem = {
    id: number;
    text: string;
    done: boolean;
};

const todoListState = atom<TodoItem[]>({
    key: "todoListState",
    default: [],
});

export default function TodoList() {
    const todoList = useRecoilValue(todoListState);

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <TodoItemCreator />
        </div>
    );
}

let id = 0;
const getId = () => id++;

const TodoItemCreator = () => {
    const [inputValue, setInputValue] = useState("");
    const setTodoList = useSetRecoilState(todoListState);

    const addItem = () => {
        setTodoList((prev) => [
            ...prev,
            {
                id: getId(),
                text: inputValue,
                done: false,
            },
        ]);
        setInputValue("");
    };

    const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(value);
    };

    return (
        <div>
            <input type="text" value={inputValue} onChange={handleChange} style={{ fontSize: "3rem" }} />
            <button onClick={addItem} style={{ fontSize: "3rem", color: "gray" }}>
                Add
            </button>
        </div>
    );
};
