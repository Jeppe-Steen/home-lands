import { Link, useHistory } from 'react-router-dom'

// Style
import Style from './Navigation.module.scss';

const Navigation = () => {
    const history = useHistory();

    const goToFrontpage = () => {
        history.push('/Forside');
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
                        <Link className={Style.pageNavigation_linkItem_link} to="/Login"> Login </Link>
                    </li>
                    <li className={Style.pageNavigation_linkItem}>
                        <span className={Style.pageNavigation_linkItem_span}>
                            <input type="text" placeholder="Søgefelt"/>
                            <button type="button">Søg</button>
                        </span>
                    </li>
                </ul>
            </nav>

            <div></div>
        </header>
    )
}

export { Navigation };