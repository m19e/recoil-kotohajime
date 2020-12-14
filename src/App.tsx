import React from "react";
import { RecoilRoot } from "recoil";
import CharacterCounter from "./components/CharacterCounter";
import TodoList from "./components/TodoList";

export default function App() {
    return (
        <RecoilRoot>
            <div style={{ width: "100%", height: "100vh", backgroundColor: "#1DA1F2" }}>
                <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
                    <h1 style={{ textAlign: "center", fontSize: "6rem", color: "white" }}>Recoil</h1>
                    <TodoList />
                    {/* <CharacterCounter /> */}
                </div>
            </div>
        </RecoilRoot>
    );
}
