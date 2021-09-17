import { useContext, useEffect, useState } from 'react';

// Context
import { AppContext } from '../../Context/ContextProvider';

// Helpers
import { doFetch } from '../../Helpers/Fetching';

// Components
import { RatingSystem } from '../RatingSystem/RatingSystem';

// Style
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

    const resetInput = (e) => {
        e.target.value = '';
        e.target.style.borderColor = 'initial';

        const error_message = document.querySelector('.error_message');
        if(error_message) {
            error_message.remove();
        }
    };

    const handleError = (element, error_message) => {
        element.style.borderColor = 'red';
        const error = document.querySelector('.error_message');

        if(!error) {
            element.parentElement.insertAdjacentHTML('beforeend', `<p class="error_message">${error_message}</p>`);
        }
    };

    const handleSubmit = () => {
        const requiredInputs = [...document.querySelectorAll('.required')];

        let hasError = false;

        for (let input of requiredInputs) {
            if(!input.value) {
                hasError = true;
                handleError(input, 'Du skal udfylde feltet');
                return
            }
        }

        if(!hasError) {
            createReview();
        }
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
                <input className="required" name="title" type="text" placeholder="Titel" value={title} onFocus={(e) => resetInput(e)} onChange={(e) => setTitle(e.target.value)} />
                <textarea className="required" name="content" placeholder="Kommentar" value={content} onFocus={(e) => resetInput(e)} onChange={(e) => setContent(e.target.value)}>
                </textarea>

                <RatingSystem setRating={setRating} rating={rating} />

                <span>
                    <button type="button" onClick={closeModal}>Annuller</button>
                    <button type="button" onClick={handleSubmit}>Send</button>
                </span>
            </form>
        </div>
    )
}

export { Modal };