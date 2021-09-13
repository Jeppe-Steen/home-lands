// Style
import Style from './Footer.module.scss';

const Footer = () => {
    const footerData = {
        address: 'Øster Uttrupvej 5',
        zipCode: '9000 Aalborg',
        mail: 'nfo@homelands.dk',
        phone: '+45 1122 3344', 
    }


    return (
        <footer className={Style.pageFooter}>
            <h5 className={Style.pageFooter_logo}> HomeLands </h5>

            <ul className={Style.pageFooter_list}>
                <li> {footerData.address} </li>
                <li> {footerData.zipCode} </li>
            </ul>

            <ul className={Style.pageFooter_list}>
                <li> Email: {footerData.mail} </li>
                <li> Telefon: {footerData.phone} </li>
            </ul>

            <span className={Style.pageFooter_socialIcons}>
                <p>Twitter</p>
                <p>Facebook</p>
            </span>
        </footer>
    )
}

export { Footer };