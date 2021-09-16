import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

// Context
import { AppContext } from '../../Context/ContextProvider';

// Style
import Style from './Navigation.module.scss';

// Components
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';

const Navigation = () => {
    const { loginData, setSearchData } = useContext(AppContext);
    const [toggleMenu, setToggleMenu] = useState(false);
    const history = useHistory();

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
        toggelingMenu();

        history.push('/Udvalg');
    }

    const toggelingMenu = () => {
        setToggleMenu(false);
    }



    return (
        <header className={Style.pageNavigation}>
            <div onClick={goToFrontpage} className={Style.pageNavigation_logo}>
                <h1>HomeLands</h1>
            </div>

            <nav className={toggleMenu ? `${Style.pageNavigation_nav} ${Style.active}` : Style.pageNavigation_nav}>
                <ul className={Style.pageNavigation_list}>
                    <li className={Style.pageNavigation_linkItem}> 
                        <Link onClick={toggelingMenu} className={Style.pageNavigation_linkItem_link} to="/Forside"> Forside </Link> 
                    </li>

                    <li className={Style.pageNavigation_linkItem}> 
                        <Link onClick={toggelingMenu} className={Style.pageNavigation_linkItem_link} to="/Udvalg"> Boliger tilsalg </Link> 
                    </li>

                    <li className={Style.pageNavigation_linkItem}> 
                        <Link onClick={toggelingMenu} className={Style.pageNavigation_linkItem_link} to="/Login"> {loginData.user_id ? 'Admin' : 'Login'} </Link>
                    </li>
                    <li className={Style.pageNavigation_linkItem}>
                        <span className={Style.pageNavigation_linkItem_span}>
                            <input id="search" onKeyUp={(e) => handleSearch(e.target.value)} type="text" placeholder="Søgefelt"/>
                            <button onClick={search} type="button">Søg</button>
                        </span>
                    </li>
                </ul>
            </nav>

            <BurgerMenu toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
        </header>
    )
}

export { Navigation };