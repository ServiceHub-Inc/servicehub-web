import { createContext, useReducer } from "react";

export const usersContext = createContext();

const initialState = {};

export const usersReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        users: action.payload,
      };
    case "ADD_USERS":
      return {
        users: [action.payload, ...state.users],
      };
    default:
      return state;
  }
};

const UsersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, {
    users: null,
  });
  return (
    <usersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </usersContext.Provider>
  );
};

export default UsersContextProvider;
