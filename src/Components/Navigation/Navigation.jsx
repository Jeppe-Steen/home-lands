import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { AppContext } from '../../Context/ContextProvider';

// Style
import Style from './Navigation.module.scss';

const Navigation = () => {
    const { loginData } = useContext(AppContext);
    const history = useHistory();

    const { setSearchData } = useContext(AppContext);

    const goToFrontpage = () => {
        history.push('/Forside');
    }

    let search_input = '';

    const handleSearch = (val) => {
        search_input = val;
    }

    const search = () => {
        setSearchData(search_input);
        document.getElementById('search').value = '';

        history.push('/Udvalg');
    }



    return (
        <header className={Style.pageNavigation}>
            <div onClick={goToFrontpage} className={Style.pageNavigation_logo}>
                <h1>HomeLands</h1>
            </div>

            <nav className={Style.pageNavigation_nav}>
                <ul className={Style.pageNavigation_list}>
                    <li className={Style.pageNavigation_linkItem}> 
                        <Link className={Style.pageNavigation_linkItem_link} to="/Forside"> Forside </Link> 
                    </li>

                    <li className={Style.pageNavigation_linkItem}> 
                        <Link className={Style.pageNavigation_linkItem_link} to="/Udvalg"> Boliger tilsalg </Link> 
                    </li>

                    <li className={Style.pageNavigation_linkItem}> 
                        <Link className={Style.pageNavigation_linkItem_link} to="/Login"> {loginData.user_id ? 'Admin' : 'Login'} </Link>
                    </li>
                    <li className={Style.pageNavigation_linkItem}>
                        <span className={Style.pageNavigation_linkItem_span}>
                            <input id="search" onKeyUp={(e) => handleSearch(e.target.value)} type="text" placeholder="Søgefelt"/>
                            <button onClick={search} type="button">Søg</button>
                        </span>
                    </li>
                </ul>
            </nav>

            <div></div>
        </header>
    )
}

export { Navigation };