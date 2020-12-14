import React from "react";
import { RecoilRoot } from "recoil";
import CharacterCounter from "./components/CharacterCounter";

export default function App() {
    return (
        <RecoilRoot>
            <div style={{ width: "100%", height: "100vh", backgroundColor: "#1DA1F2" }}>
                <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
                    <h1>Recoil</h1>
                    <CharacterCounter />
                </div>
            </div>
        </RecoilRoot>
    );
}
