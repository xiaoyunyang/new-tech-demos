import { Machine } from "xstate";
import { assign } from "xstate/lib/actionTypes";

enum UsersList {
  IDLE = "IDLE",
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR"
}
const usersMachine = Machine({
  id: "usersMachine",
  initial: "idle",
  context: {
    users: [],
    errorMessage: ""
  },
  states: {
    [UsersList.IDLE]: {
      on: {
        fetch: UsersList.PENDING
      }
    },
    [UsersList.PENDING]: {
      entry: "fetchData",
      on: {
        resolve: {
          target: UsersList.SUCCESS,
          actions: ["setResults"]
        },
        reject: {
          target: UsersList.ERROR,
          actions: ["setError"]
        }
      }
    },
    [UsersList.SUCCESS]: {
      on: {
        fetch: UsersList.PENDING
      }
    },
    [UsersList.ERROR]: {
      on: {
        fetch: UsersList.PENDING
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
