import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/ContextProvider';
import { doFetch } from '../../Helpers/Fetching';
import Style from './MyReviews.module.scss';

const MyReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const { loginData } = useContext(AppContext);

    const getReviews = async () => {
        const url = `https://api.mediehuset.net/homelands/reviews`;
        const response = await doFetch(url, 'GET', null, loginData.access_token);
        setReviews(response);
    }

    useEffect(() => {
        getReviews();
    }, [])

    useEffect(() => {
        const filterReviews = reviews.filter(review => review.user_id === loginData.user_id);
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
                            <button type="button"> Update </button>
                            <button type="button"> Slet </button>
                        </td>
                    </tr>
                )
            }) : null }
        </table>
    )
}

export { MyReviews };