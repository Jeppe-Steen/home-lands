
import { useHistory } from 'react-router';
import { useContext } from 'react/cjs/react.development';
import { AppContext } from '../../Context/ContextProvider';
import Style from './Reviews.module.scss';

const Reviews = (props) => {
    const { loginData } = useContext(AppContext);
    const history = useHistory();

    const data = props.data;
    const style = props.style;

    const handleClick = () => {
        if(!loginData.user_id) {
            history.push('/Login')
        } else { console.log('should open model') };
    }


    return (
        <article className={style ? `${Style.review_disable} ${Style.review_active}` : `${Style.review_disable}`}>
            <header>
                <h3>{data.title}</h3>
            </header>
            <p>"{data.content}"</p>
            <footer>
                <p>{data.user.firstname} {data.user.lastname}</p>
                <button onClick={handleClick} type="button">{loginData.user_id ? 'Skriv en anmeldelse her' : 'Login for at skrive en anmeldelse'}</button>
            </footer>
        </article>
    )
}

export { Reviews };