import { usersContext } from "../contexts/UserContext";
import { useContext } from "react";

export const useUsersContext = () => {
  const context = useContext(usersContext);

  if (!context) {
    throw Error(" useUsersContext must be used within a userContextProvider");
  }

  return context;
};
