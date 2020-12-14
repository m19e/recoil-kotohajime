import React from "react";
import { atom } from "recoil";

const textState = atom({
    key: "textState",
    default: "",
});

export default function CharacterCounter() {
    return <div></div>;
}
