import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/ContextProvider';
import { doFetch } from '../../Helpers/Fetching';
import { RatingSystem } from '../RatingSystem/RatingSystem';
import Style from './Modal.module.scss';

const Modal = () => {
    const [rating, setRating] = useState();
    const { loginData, modalActive, setModalActive } = useContext(AppContext);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const closeModal = () => {
        setTitle('');
        setContent('');
        setModalActive(false);
    }

    const createReview = async () => {
        const url = `https://api.mediehuset.net/homelands/reviews`;
        const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('user_id', loginData.user_id);
            formData.append('active', true);
            formData.append('num_stars', rating);
        const response = await doFetch(url, 'POST', formData, loginData.access_token);
        closeModal();
        return response;
    }

    useEffect(() => {
        setRating(0);
    }, [])


    return (
        <div className={modalActive ? `${Style.modal} ${Style.active}` : `${Style.modal}`}>
            <form>
                <input name="title" type="text" placeholder="Titel" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea name="content" placeholder="Kommentar" value={content} onChange={(e) => setContent(e.target.value)}>
                </textarea>

                <RatingSystem setRating={setRating} rating={rating} />

                <span>
                    <button type="button" onClick={closeModal}>Annuller</button>
                    <button type="button" onClick={createReview}>Send</button>
                </span>
            </form>
        </div>
    )
}

export { Modal };