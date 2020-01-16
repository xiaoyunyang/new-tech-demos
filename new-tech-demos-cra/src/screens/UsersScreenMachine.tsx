import React from "react";
import { useMachine } from "@xstate/react";
import getAllUsers from "../services/api";
import UsersList from "../components/UsersList";
import apiMachine, { ApiMachineState } from "../machines/apiMachine";

export default function UsersScreen() {
    const [usersState, dispatch] = useMachine(apiMachine, {
        actions: {
            fetchData: () => {
                getAllUsers()
                    .then((results) => dispatch({ type: "resolve", users: results }))
                    .then((error) => dispatch({ type: "reject", error }));
            }
        }
    });

    return (
        <div className="App">
            <h1>State Machine Users Screen</h1>
            <button type="button" onClick={() => dispatch({ type: "fetch" })}>Fetch Users</button>
            {
                usersState.matches(ApiMachineState.PENDING)
                && <h1>loading ...</h1>
            }
            {
                usersState.matches(ApiMachineState.SUCCESS)
                && <UsersList users={usersState.context.users} />
            }
        </div>
    );
}
