import { useEffect, useState } from 'react';

// Style
import Style from './RangedSlider.module.scss';

const RangedSlider = (props) => {

    const [maxDefaultVal, setMaxDefaultVal] = useState(0);

    const houses = props.houses;
    const setMaxVal = props.setMaxVal;
    const setMinVal = props.setMinVal;

    const getPrices = () => {
        const priceArr = [];
        houses.forEach(element => priceArr.push(element.price));
        priceArr.sort((a, b) => {return parseFloat(a) - parseFloat(b)});

        let uniquePrices = [...new Set(priceArr)];
        const deafultVal = uniquePrices[parseFloat(uniquePrices.length - 1)]
        console.log(deafultVal);

        setMaxDefaultVal(deafultVal);
        setMaxVal(deafultVal);
    }


    useEffect(() => {
        getPrices();
    }, [houses])


    return (
        <div className={Style.rangedSlider}>
            <div className={Style.rangedSlider_track} />
            <input id="min" type="range" defaultValue="0" min="0" max={maxDefaultVal} onChange={(e) => {setMinVal(e.target.value)}} />
            <input id="max" type="range" defaultValue={maxDefaultVal} min="0" max={maxDefaultVal} onChange={(e) => {setMaxVal(e.target.value)}} />
        </div>
    )
}

export { RangedSlider };