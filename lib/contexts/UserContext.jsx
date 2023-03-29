import { createContext, useReducer } from "react";

export const usersContext = createContext();

const initialState = {};

export const usersReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        users: action.payload,
      };
    case "ADD_USER":
      return {
        users: [action.payload, ...state.users],
      };
    case "DELETE_USER":
      return {
        users: state.users.filter((user) => user._id !== action.payload._id),
      };
    case "UPDATE_USER":
      return {
        users: state.users.map((user) => {
          if (user._id === action.payload._id) {
            return {
              ...user,
              ...action.payload,
            };
          }
          return user;
        }),
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
