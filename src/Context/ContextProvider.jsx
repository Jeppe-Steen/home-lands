import { createContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({children}) => {
    const [selectedHouse, setSelectedHouse] = useState({});
    const [loginData, setLoginData] = useState({});
    const [searchData, setSearchData] = useState('');
    const [selectedReview, setSelectedReview] = useState({});
    const [favList, setFavList] = useState([]);
    const [pictureArray, setPictureArray] = useState([]);
    const [pictureActive, setPictureActive] = useState(false);
    const [modalActive, setModalActive] = useState(false);

    const settingLoginData = () => {
        const sessionData = JSON.parse(sessionStorage.getItem('access_token'));
            if(!loginData.user_id) {
                if(sessionData && sessionData.user_id) {
                    setLoginData(sessionData);
                }
            }
    }

    const settingFavList = () => {
        const sessionData = JSON.parse(sessionStorage.getItem('favList'));
            if(!favList.length) {
                if(sessionData && sessionData.length) {
                    setFavList(sessionData);
                }
            }
    }

    useEffect(() => {
        settingLoginData();
        settingFavList();
    }, []);

    useEffect(() => {
        console.log(favList);
    }, [favList])

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
            setSelectedReview,
            favList,
            setFavList,
            pictureArray,
            setPictureArray,
            pictureActive,
            setPictureActive,
            modalActive,
            setModalActive
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };