import React from "react";
import { useMachine } from "@xstate/react";
import getAllUsers from "../services/api";
import UsersList from "../components/UsersList";
import apiMachine, { ApiMachineState, ApiMachineEvent } from "../machines/apiMachine";

export default function UsersScreen() {
    const [usersState, dispatch] = useMachine(apiMachine, {
        actions: {
            fetchData: (context, event) => {
                getAllUsers(event.hasError)
                    .then((results) => dispatch({
                        type: ApiMachineEvent.RESOLVE, users: results
                    }))
                    .catch((error) => dispatch({
                        type: ApiMachineEvent.REJECT, errorMessage: error
                    }));
            }
        }
    });
    const fetchUsers = () => dispatch({ type: ApiMachineEvent.FETCH, hasError: false });
    const fetchUsersWithErrors = () => dispatch({ type: ApiMachineEvent.FETCH, hasError: true });
    return (
        <div className="App">
            <h1>State Machine Users Screen</h1>
            <button type="button" onClick={fetchUsers}>Fetch Users</button>
            <button type="button" onClick={fetchUsersWithErrors}>Fetch Users With Error</button>
            {
                usersState.matches(ApiMachineState.PENDING)
                && <h1>loading ...</h1>
            }
            {
                usersState.matches(ApiMachineState.SUCCESS)
                && <UsersList users={usersState.context.users} />
            }
            {
                usersState.matches(ApiMachineState.ERROR)
                && <h1>{usersState.context.errorMessage}</h1>
            }
        </div>
    );
}
