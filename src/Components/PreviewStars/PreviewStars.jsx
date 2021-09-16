import { useEffect, useState } from 'react';

// Style
import Style from './PreviewStars.module.scss';

const PreviewStars = (props) => {
    // the final selected rating
    const rating = props.rating;

    // the array which is rendered
    const [ stars, setStars ] = useState([]);

    // array of stars
    let dataArray = [
        { value: 1, selected: false },
        { value: 2, selected: false },
        { value: 3, selected: false },
        { value: 4, selected: false },
        { value: 5, selected: false }
    ];

    useEffect(() => {
        setStars(dataArray)
        if(rating) {
            for (let i = 0; i <= rating - 1; i++) {
                dataArray[i].selected = true;
            };
            setStars(dataArray);
        }
    }, [rating]);

    return (
        <div>
            <span id="starSpan">
                {stars.map((item, index) => {
                    return (
                        <svg className={Style.starIcon} key={item.value} viewBox="0 0 117.34 111.59">
                            <polygon 
                                className={item.selected ? `${Style.starIcon_star} ${Style.selected}` : Style.starIcon_star} 
                                data-placement={item.value} 
                                points="58.67 91.97 23.07 110.68 29.87 71.04 1.07 42.97 40.87 37.19 58.67 1.13 76.47 37.19 116.26 42.97 87.47 71.04 94.26 110.68 58.67 91.97"
                            />
                        </svg>
                    )
                })}
            </span>
        </div>
    )
}

export { PreviewStars };