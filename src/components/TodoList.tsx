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

type TodoListStats = {
    totalNum: number;
    totalDoneNum: number;
    totalNotyetNum: number;
    percentDone: number;
};

const todoListStatsState = selector<TodoListStats>({
    key: "todoListStatsState",
    get: ({ get }) => {
        const list = get(todoListState);
        const totalNum = list.length;
        const totalDoneNum = list.filter((i) => i.done).length;
        const totalNotyetNum = totalNum - totalDoneNum;
        const percentDone = totalNum === 0 ? 0 : totalDoneNum / totalNum;

        return {
            totalNum,
            totalDoneNum,
            totalNotyetNum,
            percentDone,
        };
    },
});

export default function TodoList() {
    const todoList = useRecoilValue(filteredTodoListState);

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <TodoListFilters />
                    <TodoItemCreator />
                </div>
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

const TodoListFilters = () => {
    const [filter, setFilter] = useRecoilState(todoListFilterState);

    const updateFilter = ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(value as TodoListFilter);
    };

    return (
        <div style={{ fontSize: "2rem" }}>
            Filter:
            <select value={filter} onChange={updateFilter} style={{ fontSize: "2rem" }}>
                <option value="all">All</option>
                <option value="done">Done</option>
                <option value="notyet">Not yet</option>
            </select>
        </div>
    );
};

const TodoListStats = () => {
    const { totalNum, totalDoneNum, totalNotyetNum, percentDone } = useRecoilValue(todoListStatsState);
    const formattedPercentDone = Math.round(percentDone * 100);

    return (
        <div style={{ display: "flex" }}>
            <p>TotalItems: {totalNum}</p>
            <p>ItemsDone: {totalDoneNum}</p>
            <p>ItemsNotyet: {totalNotyetNum}</p>
            <p>PercentDone: {formattedPercentDone}</p>
        </div>
    );
};

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
