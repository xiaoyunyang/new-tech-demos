import React from "react";
import "./App.css";
import UsersScreenNaive from "./screens/UsersScreenNaive";
import UsersScreenMachine from "./screens/UsersScreenMachine";

function App() {
    return (
        <div className="App">
            {/* <UsersScreenNaive /> */}
            <UsersScreenMachine />
        </div>
    );
}

export default App;
