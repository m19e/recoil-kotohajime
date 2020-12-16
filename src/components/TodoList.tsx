import React, { useState } from "react";
import { atom, useSetRecoilState, useRecoilValue, useRecoilState, selector } from "recoil";

type TodoItemType = {
    id: number;
    text: string;
    done: boolean;
};

const todoListState = atom<TodoItemType[]>({
    key: "todoListState",
    default: [],
});

type TodoListFilter = "all" | "done" | "notyet";

const todoListFilterState = atom<TodoListFilter>({
    key: "todoListFilterState",
    default: "all",
});

const filteredTodoListState = selector<TodoItemType[]>({
    key: "filteredTodoListState",
    get: ({ get }) => {
        const filter = get(todoListFilterState);
        const list = get(todoListState);

        switch (filter) {
            case "done":
                return list.filter((item) => item.done);
            case "notyet":
                return list.filter((item) => !item.done);
            default:
                return list;
        }
    },
});

export default function TodoList() {
    const todoList = useRecoilValue(todoListState);

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <TodoItemCreator />
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", width: "30%" }}>
                    {todoList.map((todo) => (
                        <TodoItem item={todo} />
                    ))}
                </div>
            </div>
        </>
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

type TodoItemProps = {
    item: TodoItemType;
};

const replaceItemAtIndex = (arr: any[], index: number, newValue: any) => {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

const removeItemAtIndex = (arr: any[], index: number) => {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

const TodoItem = ({ item }: TodoItemProps) => {
    const [todoList, setTodoList] = useRecoilState(todoListState);
    const index = todoList.findIndex((listItem) => listItem === item);

    const editItemText = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        const newList = replaceItemAtIndex(todoList, index, {
            ...item,
            text: value,
        });
        setTodoList(newList);
    };

    const toggleItemDone = () => {
        const newList = replaceItemAtIndex(todoList, index, {
            ...item,
            done: !item.done,
        });
        setTodoList(newList);
    };

    const deleteItem = () => {
        const newList = removeItemAtIndex(todoList, index);
        setTodoList(newList);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "16px" }}>
            <input type="checkbox" checked={item.done} onChange={toggleItemDone} />
            <input type="text" value={item.text} onChange={editItemText} style={{ fontSize: "2rem", color: "gray" }} />
            <button onClick={deleteItem} style={{ fontSize: "2rem", color: "gray" }}>
                X
            </button>
        </div>
    );
};
