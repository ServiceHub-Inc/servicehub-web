import { createContext, useReducer } from "react";

export const adminsContext = createContext();

const initialState = {};

export const adminsReducer = (state, action) => {
  switch (action.type) {
    case "SET_ADMINS":
      return {
        admins: action.payload,
      };
    case "ADD_ADMIN":
      return {
        admins: [action.payload.admin, ...state.admins],
      };
    case "DELETE_ADMIN":
      return {
        admins: state.admins.filter(
          (admin) => admin._id !== action.payload._id,
        ),
      };
    case "UPDATE_ADMIN":
      return {
        admins: state.admins.map((admin) => {
          if (admin._id === action.payload._id) {
            return {
              ...admin,
              ...action.payload,
            };
          }
          return admin;
        }),
      };
    default:
      return state;
  }
};

const AdminsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminsReducer, {
    admins: null,
  });
  return (
    <adminsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </adminsContext.Provider>
  );
};

export default AdminsContextProvider;
