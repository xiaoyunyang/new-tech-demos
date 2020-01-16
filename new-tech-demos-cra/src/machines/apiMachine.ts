import { Machine } from "xstate";
import { assign } from "xstate/lib/actionTypes";

export enum ApiMachineState {
  IDLE = "IDLE",
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR"
}
const usersMachine = Machine({
  id: "usersMachine",
  initial: ApiMachineState.IDLE,
  context: {
    users: [],
    errorMessage: ""
  },
  states: {
    [ApiMachineState.IDLE]: {
      on: {
        fetch: ApiMachineState.PENDING
      }
    },
    [ApiMachineState.PENDING]: {
      entry: "fetchData",
      on: {
        resolve: {
          target: ApiMachineState.SUCCESS,
          actions: ["setResults"]
        },
        reject: {
          target: ApiMachineState.ERROR,
          actions: ["setError"]
        }
      }
    },
    [ApiMachineState.SUCCESS]: {
      on: {
        fetch: ApiMachineState.PENDING
      }
    },
    [ApiMachineState.ERROR]: {
      on: {
        fetch: ApiMachineState.PENDING
      }
    }
  }
}, {
  actions: {
    // setResults: assign((context, event) => ({ users: event.users}),
    // setError: assign((context, event)) => ({error: event.error})
  }
});


export default usersMachine;
