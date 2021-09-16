import { useContext, useEffect, useState } from 'react';

// Context
import { AppContext } from '../../Context/ContextProvider';

// Helpers
import { doFetch } from '../../Helpers/Fetching';

// Components
import { RatingSystem } from '../RatingSystem/RatingSystem';

// Style
import Style from './ModalEdit.module.scss';

const ModalEdit = () => {
    const [rating, setRating] = useState(0);
    const { loginData, modalEditActive, setModalEditActive, modalEditContent } = useContext(AppContext);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [id, setId] = useState('');

    const closeModal = () => {
        setTitle(title);
        setContent(content);
        setModalEditActive(false);
    }

    const createReview = async () => {
        const url = `https://api.mediehuset.net/homelands/reviews`;

        const formData = new FormData();
            formData.append('id', id);
            formData.append('title', title);
            formData.append('content', content);
            formData.append('num_stars', rating);
            formData.append('active', 1);

        const response = await doFetch(url, 'PUT', formData, loginData.access_token);
        console.log(id);
        console.log(response);
        closeModal();
    }

    useEffect(() => {
        setRating(modalEditContent.num_stars);
        setTitle(modalEditContent.title);
        setContent(modalEditContent.content);
        setId(modalEditContent.id)
    }, [modalEditContent]);


    return (
        <div className={modalEditActive ? `${Style.modalEdit} ${Style.active}` : `${Style.modalEdit}`}>
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

export { ModalEdit };