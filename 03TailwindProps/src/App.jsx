import { useState } from "react";
import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Card from "./components/card";

function App() {
  // let myObj = {
  //   username: "jangra",
  //   age: 18,
  // };

  // let newArr = [1, 2, 3, 5];

  return (
    <>
      <h1 className="bg-green-400 text-black p-4 rounded-xl mb-4">
        TailWind Test
      </h1>
      {/* <Card channel="jangra" someObj={myObj} anotherObj={newArr} /> */}
      <Card username="piyush" btnText="click me" />
      <Card username="jangra" />
    </>
  );
}

export default App;
