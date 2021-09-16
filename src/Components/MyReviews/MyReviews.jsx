import { useContext, useEffect, useState } from 'react';

// Context 
import { AppContext } from '../../Context/ContextProvider';

// Helpers
import { doFetch } from '../../Helpers/Fetching';

// Style
import Style from './MyReviews.module.scss';

const MyReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const { loginData, modalEditActive, setModalEditActive, setModalEditContent } = useContext(AppContext);

    const getReviews = async () => {
        const url = `https://api.mediehuset.net/homelands/reviews`;
        const response = await doFetch(url, 'GET', null, loginData.access_token);
        setReviews(response);
    }

    const handleOpen = (item) => {
        setModalEditContent(item);
        console.log(item);
        setModalEditActive(true);
    }

    const handleDelete = async (item) => {
        const url = `https://api.mediehuset.net/homelands/reviews/${item}`;
        const response = await doFetch(url, 'DELETE', null, loginData.access_token);
        getReviews();
    }

    useEffect(() => {
        getReviews();
    }, [modalEditActive])

    useEffect(() => {
        const filterReviews = reviews.filter(review => loginData.user_id == review.user_id);
        setFilteredReviews(filterReviews)
    }, [reviews])

    return (
        <table className={Style.myReviews}>
            <tr>
                <th>Titel</th>
                <th>Anmeldelse</th>
                <th>Handling</th>
            </tr>
            {filteredReviews.length ? filteredReviews.map((review, index) => {
                return (
                    <tr key={index}>
                        <td>{review.title.slice(0, 35)}...</td>
                        <td>{review.content.slice(0, 10)}...</td>
                        <td>
                            <button onClick={() => handleOpen(review)} type="button"> Update </button>
                            <button onClick={() => handleDelete(review.id)} type="button"> Slet </button>
                        </td>
                    </tr>
                )
            }) : null }
        </table>
    )
}

export { MyReviews };