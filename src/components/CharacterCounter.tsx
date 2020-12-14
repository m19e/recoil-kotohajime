import React from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

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

const charCountState = selector({
    key: "charCountState",
    get: ({ get }) => {
        const text = get(textState);
        return text.length;
    },
});

const TextInput = () => {
    const [text, setText] = useRecoilState(textState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "3rem" }}>
            <div style={{ display: "flex", flexDirection: "column", width: "50%", color: "white" }}>
                <input type="text" value={text} onChange={handleChange} style={{ fontSize: "3rem" }} />
                Echo: {text}
                <br />
                <CharCount />
            </div>
        </div>
    );
};

const CharCount = () => {
    const count = useRecoilValue(charCountState);

    return <>Character Count: {count}</>;
};
