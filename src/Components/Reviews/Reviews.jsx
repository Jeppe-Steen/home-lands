
import Style from './Reviews.module.scss';

const Reviews = (props) => {
    const data = props.data;
    const style = props.style;

    return (
        <article className={style ? `${Style.review_disable} ${Style.review_active}` : `${Style.review_disable}`}>
            <header>
                <h3>{data.title}</h3>
            </header>
            <p>"{data.content.slice(0, 100)}"</p>
            <footer>
                <p>{data.user.firstname} {data.user.lastname}</p>
            </footer>
        </article>
    )
}

export { Reviews };