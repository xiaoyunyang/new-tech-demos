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

// Event always have type and either users or errorMessage, never both

interface EventFetch {
    type: ApiMachineEvent;
    hasError: boolean;
    users?: never;
    errorMessage?: never;
}
interface EventSuccess {
    type: ApiMachineEvent;
    hasError?: never;
    users: User[];
    errorMessage?: never;
}
interface EventReject {
    type: ApiMachineEvent;
    hasError?: never;
    users?: never;
    errorMessage: string;
}
type Event = EventFetch | EventSuccess | EventReject

enum UserMachineAction {
    SET_RESULT = "setResult",
    SET_ERROR = "setError",
    FETCH_DATA = "fetchData"
}

// TODO: The third type parameter is Event
const usersMachine = Machine<Context, StateSchema, Event>(
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
            setError: assign((context, event) => ({ errorMessage: event.errorMessage }))
        }
    }
);

export default usersMachine;
