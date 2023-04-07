import { adminsContext } from "../contexts/AdminContext";
import { useContext } from "react";

export const useAdminsContext = () => {
  const context = useContext(adminsContext);

  if (!context) {
    throw Error(
      " useAdminsContext must be used within an adminsContextProvider"
    );
  }

  return context;
};
