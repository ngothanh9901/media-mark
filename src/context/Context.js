import { Children, useContext, useState } from "react";
import { createContext } from "react";


export const UserContext = createContext()


const Context = ({children}) => {
    const [name, setName] = useState("");

    return (
        <UserContext.Provider value={[name,setName]}>
            {children}
        </UserContext.Provider>
      );

}
export default Context;
