import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { GlobalStyle } from "./style/GlobalStyle";
import ToDoList from "./components/ToDoList";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <ToDoList />
    </RecoilRoot>
  );
}

export default App;
