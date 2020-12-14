import React from "react";
import { useRecoilState } from "recoil";
import { atom } from "recoil";

export default function CharacterCounter() {
    return (
        <div>
            <TextInput />
        </div>
    );
}

const textState = atom({
    key: "textState",
    default: "",
});

const TextInput = () => {
    const [text, setText] = useRecoilState(textState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "3rem" }}>
            <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
                <input type="text" value={text} onChange={handleChange} style={{ fontSize: "3rem" }} />
                Echo: {text}
            </div>
        </div>
    );
};
