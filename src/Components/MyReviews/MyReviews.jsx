import { useContext, useEffect, useState } from 'react';
import { Pen, Trash } from '../../Assets/Icons';

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
        setModalEditActive(true);
        console.log('something is happening');
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
            <thead>
                <tr>
                    <th>Titel</th>
                    <th>Anmeldelse</th>
                    <th>Handling</th>
                </tr>
            </thead>
            <tbody>
                {filteredReviews.length ? filteredReviews.map((review, index) => {
                    return (
                        <tr key={index}>
                            <td>{review.title.slice(0, 35)}...</td>
                            <td>{review.content.slice(0, 10)}...</td>
                            <td>
                                <Pen func={handleOpen} data={review} />
                                <Trash func={handleDelete} data={review.id} />
                            </td>
                        </tr>
                    )
                }) : null }
            </tbody>
        </table>
    )
}

export { MyReviews };