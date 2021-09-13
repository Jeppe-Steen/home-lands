import { useHistory } from 'react-router';
import { useContext } from 'react';

// Style
import Style from './ListItems.module.scss';

// Context
import { AppContext } from '../../Context/ContextProvider';

const ListItems = (props) => {
    const data = props.data;
    const history = useHistory();

    const {setSelectedHouse} = useContext(AppContext);



    const handleClick = () => {
        setSelectedHouse(data);
        history.push(`/Udvalg/${data.address}`);
    };

    return (
        <figure className={Style.listItem} onClick={handleClick}>
            <img src={data.images[0].filename.large} alt="" />
        </figure> 
    )
}

export { ListItems };