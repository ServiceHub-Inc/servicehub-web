import { createContext, useReducer } from "react";

export const adminsContext = createContext();

const initialState = {};

export const usersReducer = (state, action) => {
  switch (action.type) {
    case "SET_ADMINS":
      return {
        admins: action.payload,
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

const AdminsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, {
    admins: null,
  });
  return (
    <adminsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </adminsContext.Provider>
  );
};

export default AdminsContextProvider;
