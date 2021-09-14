import { createContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({children}) => {
    const [selectedHouse, setSelectedHouse] = useState({});
    const [loginData, setLoginData] = useState({});
    const [searchData, setSearchData] = useState('');
    const [selectedReview, setSelectedReview] = useState({});


    return (
        <AppContext.Provider
        value={{
            selectedHouse,
            setSelectedHouse,
            loginData,
            setLoginData,
            searchData,
            setSearchData,
            selectedReview,
            setSelectedReview
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };