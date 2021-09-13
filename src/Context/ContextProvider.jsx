import { createContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({children}) => {
    const [selectedHouse, setSelectedHouse] = useState({});



    return (
        <AppContext.Provider
        value={{
            selectedHouse,
            setSelectedHouse
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };