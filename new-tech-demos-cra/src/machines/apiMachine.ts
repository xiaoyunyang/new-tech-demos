import { Machine, assign } from "xstate";
import { User } from "../services/api";

export enum ApiMachineState {
  IDLE = "IDLE",
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR"
}
interface Context {
    users: User[];
    errorMessage: string;
}
interface StateSchema {
    states: {
        [state in ApiMachineState]: {}
    };
}
export enum ApiMachineEvent {
    FETCH = "fetch",
    RESOLVE = "resolve",
    REJECT = "reject"
}

interface Event {
    type: ApiMachineEvent;
}

enum UserMachineAction {
    SET_RESULT = "setResult",
    SET_ERROR = "setError",
    FETCH_DATA = "fetchData"
}

// TODO: The third type parameter is Event
const usersMachine = Machine<Context, StateSchema>(
    {
        id: "usersMachine",
        initial: ApiMachineState.IDLE,
        context: {
            users: [],
            errorMessage: ""
        },
        states: {
            [ApiMachineState.IDLE]: {
                on: {
                    [ApiMachineEvent.FETCH]: ApiMachineState.PENDING
                }
            },
            [ApiMachineState.PENDING]: {
                entry: UserMachineAction.FETCH_DATA, // implementing this outside the machine
                on: {
                    [ApiMachineEvent.RESOLVE]: {
                        target: ApiMachineState.SUCCESS,
                        actions: [UserMachineAction.SET_RESULT]
                    },
                    [ApiMachineEvent.REJECT]: {
                        target: ApiMachineState.ERROR,
                        actions: [UserMachineAction.SET_ERROR]
                    }
                }
            },
            [ApiMachineState.SUCCESS]: {
                on: {
                    [ApiMachineEvent.FETCH]: ApiMachineState.PENDING
                }
            },
            [ApiMachineState.ERROR]: {
                on: {
                    [ApiMachineEvent.FETCH]: ApiMachineState.PENDING
                }
            }
        }
    },
    {
        actions: {
            setResult: assign((context, event) => ({ users: event.users })),
            setError: assign((context, event) => ({ errorMessage: event.error }))

        }
    }
);

export default usersMachine;
