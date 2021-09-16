import { useHistory } from 'react-router';
import { useContext, useState, useEffect } from 'react';

// Style
import Style from './ListItems.module.scss';

// Context
import { AppContext } from '../../Context/ContextProvider';

// Assets
import { Heart } from '../../Assets/Heart';

// Helpers
import { doFetch } from '../../Helpers/Fetching';

const ListItems = (props) => {
    const data = props.data;
    const history = useHistory();

    const {setSelectedHouse, loginData } = useContext(AppContext);

    const [energyColor, setEnergyColor] = useState('');
    const [price, setPrice] = useState('');
    
    const addViews = async () => {
        const url = `https://api.mediehuset.net/homelands/homes/${data.id}`;
        const response = await doFetch(url, 'PATCH', null, loginData.access_token);
        console.log(response);
        return response;
    }


    const handleClick = () => {
        setSelectedHouse(data);

        if(loginData.user_id) {
            addViews();
        }

        history.push(`/Udvalg/${data.address}`);
    };

    const formatPrice = () => {
        const formattetPrice = data.price.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        setPrice(formattetPrice);
    }

    useEffect(() => {
        setEnergyColor(data.energy_label_name);
        formatPrice();
    }, []);

    return (
        <figure className={Style.listItem}>
            <img className={Style.listItem_image} src={data.images[0].filename.medium} alt="" />
            <figcaption onClick={handleClick} className={Style.listItem_caption}>
                <h3 className={Style.listItem_header}>{data.address}</h3>
                <p className={Style.listItem_tekst}>{data.city} {data.zipcode}</p>
                <p className={Style.listItem_tekst}>{data.type}</p>
                <span className={Style.listItem_data}>
                    <div className={`${Style.listItem_data_label} ${energyColor}`}>{data.energy_label_name}</div>
                    <p className={Style.listItem_data_tekst}>{data.num_rooms} værelser, {data.floor_space}m2</p>
                    <p className={Style.listItem_data_price}>{price} DKK</p>
                </span>
            </figcaption>
            {loginData.user_id ? <Heart id={data.id} /> : null}
        </figure> 
    )
}

export { ListItems };