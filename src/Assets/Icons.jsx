import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/ContextProvider';
import { doFetch } from '../Helpers/Fetching';
import Style from './Icons.module.scss';

const Camera = () => {
    return (
        <svg className={Style.camera} viewBox="0 0 139.17 125.25">
            <path id="Path_3" data-name="Path 3" d="M91.85,69.59A22.27,22.27,0,1,1,69.58,47.32h0A22.27,22.27,0,0,1,91.85,69.59Z"/>
            <path id="Path_4" data-name="Path 4" d="M48.71,0,36,13.92h-22A14,14,0,0,0,0,27.83v83.51a14,14,0,0,0,13.92,13.91H125.25a14,14,0,0,0,13.92-13.91V27.83a14,14,0,0,0-13.92-13.91h-22L90.46,0ZM69.6,104.38a34.8,34.8,0,1,1,34.78-34.82v0A34.82,34.82,0,0,1,69.6,104.38Z"/>
        </svg>
    )
}

const Location = () => {
    return (
        <svg className={Style.location}  viewBox="0 0 92.59 138.8">
            <path d="M46.32,138.8a6.73,6.73,0,0,1-.7-1.1c-8.4-14.6-16.9-29.2-25.3-43.8-4.6-8-9.2-15.9-13.8-23.9A44.45,44.45,0,0,1,.12,49.7a45.06,45.06,0,0,1,10-32.2C18,7.7,28.32,2.1,40.72.3a44.13,44.13,0,0,1,10.9.1,46,46,0,0,1,39.7,35.4c2.6,11.4,1.3,22.4-4.6,32.7-4.6,8.1-9.3,16.2-13.9,24.3-8.5,14.8-17.1,29.6-25.6,44.4A8.94,8.94,0,0,1,46.32,138.8Zm0-109.7A17.12,17.12,0,0,0,29,46.4a17.35,17.35,0,0,0,34.7,0A17.2,17.2,0,0,0,46.32,29.1Z"/>
        </svg>
    )
} 

const Plan = () => {
    return (
        <svg className={Style.plan}  viewBox="0 0 137.63 123.48">
            <path d="M65,44.12v-27c0-3.12,0-6.24,0-9.36C65.08,2.39,67.48,0,72.79,0l57.77,0c4.45,0,7.07,2.59,7.07,7q0,52,0,104c0,1.78,0,3.55,0,5.32,0,4.4-2.68,7.09-7.08,7.08q-36.74,0-73.48,0-24.94,0-49.91,0c-4.71,0-7.16-2.43-7.16-7.14Q0,83.81,0,51.28c0-4.59,2.55-7.15,7.22-7.15H65ZM54.46,110.5c1.1.09,1.93.23,2.76.23,21.53,0,43.07,0,64.61,0,2.4,0,3-.89,2.93-3.12-.1-11-.05-22.11-.05-33.16,0-5.07,0-10.13,0-15.19,0-1.78-.62-2.43-2.37-2.32s-3.55.06-5.32,0A6.09,6.09,0,0,1,111,51.66c-.43-3.54,1.24-6.38,4.59-7.09a27.89,27.89,0,0,1,6.53-.4c1.94.06,2.66-.49,2.64-2.54q-.14-13.16,0-26.33c0-1.89-.61-2.44-2.48-2.43q-20.91.11-41.81,0c-2,0-2.64.54-2.62,2.56.11,7.59,0,15.19,0,22.78,0,5.66,0,5.66,5.5,5.93,4.17.2,7.25,3.14,7.07,6.73S87.43,57,83.21,57c-8.7,0-17.4.07-26.1,0-2.15,0-2.74.69-2.67,2.75a49,49,0,0,1-.28,8.82,6,6,0,0,1-6.79,5.09,6.22,6.22,0,0,1-5.76-6.26c-.06-2.53-.12-5.07,0-7.6.11-2-.47-2.83-2.66-2.79q-11.78.16-23.56,0c-2.08,0-2.52.72-2.51,2.63q.09,24.3,0,48.61c0,2.1.77,2.57,2.63,2.55,7.1-.06,14.19,0,21.29,0,5.8,0,4.62.17,4.81-4.7a18.83,18.83,0,0,1,.71-5.69c1-2.63,4.27-4,6.93-3.49,2.89.62,5,3.21,5.19,6.68C54.57,105.8,54.46,108.06,54.46,110.5Z"/>
        </svg>
    )
}

const Heart = (props) => {
    const [isFavorit, setIsFavorit] = useState(false);

    const { loginData, favList, setFavList } = useContext(AppContext);

    const houseId = props.data;

    const setAsFavorit = async () => {
        setIsFavorit(true)
        setFavList([...favList, houseId]);
        
        const url = `https://api.mediehuset.net/homelands/favorites`;
        const formData = new FormData();
            formData.append('home_id', houseId);
        const response = await doFetch(url, 'POST', formData, loginData.access_token);

        const sessionData = JSON.stringify([...favList, houseId]);
        sessionStorage.setItem('favList', sessionData);

        return response;
    }

    const removeAsFavorit = async () => {
        setIsFavorit(false)
        const filteredFavList = favList.filter(elements => elements !== houseId);
        setFavList(filteredFavList);

        const url = `https://api.mediehuset.net/homelands/favorites/${houseId}`;
        const response = await doFetch(url, 'DELETE', null, loginData.access_token);

        const sessionData = JSON.stringify(filteredFavList);
        sessionStorage.setItem('favList', sessionData);
        
        return response;
    }

    useEffect(() => {
        const isLiked = favList.some(element => element === props.data);
        if(isLiked) {
            setIsFavorit(true);
        } else {
            setIsFavorit(false);
        }
    }, [favList]);

    return (
        <svg onClick={!isFavorit ? setAsFavorit : removeAsFavorit} className={isFavorit ? `${Style.heart} ${Style.active}` : Style.heart} viewBox="0 0 139.66 120.58">
            <path d="M69.92,18.48l2.27-2.91C82.31,2.63,97.79-2.79,112.7,1.38c14.17,4,24.42,16.84,26.47,32.89,2,15.37-2,29-11.34,41.25a111.79,111.79,0,0,1-25.18,24.09c-10.09,7-20.44,13.72-30.76,20.42a4.19,4.19,0,0,1-3.72.19c-14.1-9.74-28.58-19-42-29.67C14.83,81.54,5.8,70.2,1.93,55.63A50.29,50.29,0,0,1,2.24,27C6.45,13.72,14.63,4.16,28.64,1.08c14.69-3.24,27.13,1.3,37.2,12.39C67.22,15,68.44,16.66,69.92,18.48Zm50.45,23.69c0,.66-.05,1.32-.13,2-.37,3.25.42,5.83,4.11,6.36,3.05.44,5.24-1.78,5.28-5.8A50,50,0,0,0,128.78,33c-2.86-12.36-13.91-22.58-25.64-24.26-3.91-.56-6.76,1.53-6.4,4.8s2.81,4,5.5,4.69A23.36,23.36,0,0,1,120.37,42.17Z"/>
        </svg>
    )
}

const Facebook = () => {
    return (
        <p></p>
    )
}

const Twitter = () => {
    return (
        <p></p>
    )
}

const Search = () => {
    return (
        <p></p>
    )
}

const Pen = () => {
    return (
        <p></p>
    )
}

const Trash = () => {
    return (
        <p></p>
    )
}

export { Camera, Location, Plan, Heart, Facebook, Twitter, Search, Pen, Trash };