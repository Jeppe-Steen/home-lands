import { useEffect, useState } from 'react';

// Style
import Style from './Reviews.module.scss';

// Components
import { PreviewStars } from '../PreviewStars/PreviewStars';

const Reviews = (props) => {
    const data = props.data;
    const style = props.style;

    const [ rating, setRating ] = useState(0);

    useEffect(() => {
        setRating(data.num_stars);
    }, [])

    return (
        <article className={style ? `${Style.review_disable} ${Style.review_active}` : `${Style.review_disable}`}>
            <header>
                <h3>{data.title}</h3>
            </header>
            <p>"{data.content.slice(0, 100)}"</p>
            <PreviewStars rating={rating} />
            <footer>
                <p>{data.user.firstname} {data.user.lastname}</p>
            </footer>
        </article>
    )
}

export { Reviews };