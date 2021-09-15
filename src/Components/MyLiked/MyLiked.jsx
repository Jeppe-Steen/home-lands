import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/ContextProvider';
import Style from './MyLiked.module.scss';

import { doFetch } from '../../Helpers/Fetching';

const MyLiked = () => {
    const { loginData, setFavList } = useContext(AppContext);
    const [likedHouses, setLikedHouses] = useState([]);

    const getLikedHouses = async () => {
        const url = `https://api.mediehuset.net/homelands/favorites`;
        const response = await doFetch(url, 'GET', null, loginData.access_token);
        setLikedHouses(response);
    }

    // TODO: fix
    const handleDelete = async (houseId) => {
        const url = `https://api.mediehuset.net/homelands/favorites/${houseId}`;
        const response = await doFetch(url, 'DELETE', null, loginData.access_token);
        getLikedHouses();
        settingSessionData();
        return response;
    }

    const settingSessionData = () => {
        if(likedHouses && likedHouses.length) {
            let arr = [];

            likedHouses.forEach(house => arr.push(house.home_id));

            const sessionData = JSON.stringify(arr, null, 2);
            sessionStorage.setItem('favList', sessionData);
            setFavList(arr);
        }
    }

    useEffect(() => {
        getLikedHouses();
        settingSessionData();
    }, [])

    return (
        <table className={Style.myLiked}>
            <tr>
                <th>Titel</th>
                <th>Dato</th>
                <th>Handling</th>
            </tr>
            {likedHouses.length ? likedHouses.map((house, index) => {
                return (
                    <tr key={index}>
                        <td>{house.address}, {house.city} {house.zipcode}</td>
                        <td>{house.price}</td>
                        <td>
                            <button type="button" onClick={() => handleDelete(house.home_id)}> Slet </button>
                        </td>
                    </tr>
                )
            }) : null }
        </table>
    )
}

export { MyLiked };