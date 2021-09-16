import { useContext } from 'react';

// Context
import { AppContext } from '../../Context/ContextProvider';

// Style
import Style from './RangedSlider.module.scss';

const RangedSlider = () => {

    const { highestPrice, setMaxPrice, setMinPrice } = useContext(AppContext);

    return (
        <div className={Style.rangedSlider}>
            <div className={Style.rangedSlider_track} />
            <input type="range" defaultValue="0" min="0" max={highestPrice} onChange={(e) => setMinPrice(e.target.value)} />
            <input type="range" defaultValue={highestPrice} min="0" max={highestPrice} onChange={(e) => setMaxPrice(e.target.value)}/>
        </div>
    )
}

export { RangedSlider };