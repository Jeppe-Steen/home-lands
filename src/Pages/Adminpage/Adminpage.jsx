import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';

// Components
import { ModalEdit } from '../../Components/ModalEdit/ModalEdit';
import { MyLiked } from '../../Components/MyLiked/MyLiked';
import { MyReviews } from '../../Components/MyReviews/MyReviews';

// Context
import { AppContext } from '../../Context/ContextProvider';

// Style
import Style from './Adminpage.module.scss';

const Adminpage = () => {
    const { loginData, setLoginData } = useContext(AppContext);
    const history = useHistory();

    useEffect(() => {
        if(!loginData.user_id) {
            history.push('/Login');
        }
    }, []);

    const handleLogout = () => {
        setLoginData({});
        sessionStorage.clear();
        history.push('/Forside');
    }


    return (
        <main className={Style.adminPage}>
            <header className={Style.adminPage_header}>
                <h2>Administration</h2>
            </header>

            <section className={Style.adminPage_section}>
                <article className={Style.adminPage_section_reviews}>
                    <header>
                        <h3>Anmeldelser</h3>
                    </header>
                    <MyReviews />
                    <ModalEdit />
                </article>
                <article className={Style.adminPage_section_liked}>
                    <header>
                        <h3>Favoritter</h3>
                    </header>
                    <MyLiked />
                </article>
                <aside className={Style.adminPage_section_login}> 
                    <p>Du er nu logget ind som <strong>{loginData.username}</strong></p>
                    <button onClick={handleLogout} type="button">Logud</button>
                </aside>
            </section>
        </main>
    )
}

export { Adminpage };