import Style from './RatingSystem.module.scss';
import { useEffect, useState } from "react";

const RatingSystem = (props) => {
    // the final selected rating
    const rating = props.rating;
    const setRating = props.setRating;

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
    }, []);

    // mouse hover handler
    // when the mouse hovers a star, then the hovered star and the stars before it, will change selected status to true  (only if there is no rating)
    const handleMouseOver = ( placement ) => {
        if (!rating) {
            for (let i = 0; i <= placement - 1; i++) {
                dataArray[i].selected = true;
            };
    
            setStars(dataArray);
        }
    };

    // mouse leave handler
    // when the mouse leaves a star, then every star will change selected status to false (only if there is no rating)
    const handleMouseLeave = () => {
        if(!rating) {
            dataArray.forEach(item => {
                item.selected = false;
            })

            setStars(dataArray);
        }
    };

    // mouse click handler
    // when a star is clicked, the star and the previous stars will change color, and then it sets the rating to the selected star
    const handleClick = ( placement ) => {
        if (!rating) {
            for (let i = 0; i <= placement - 1; i++) {
                dataArray[i].selected = true;
            };
    
            setStars(dataArray);
            setRating(placement);
        }
    };


    return (
        <div>
            <span id="starSpan">
                {stars.map((item, index) => {
                    return (
                        <svg className={Style.starIcon} key={item.value} viewBox="0 0 117.34 111.59">
                            <polygon 
                                className={item.selected ? `${Style.starIcon_star} ${Style.selected}` : Style.starIcon_star} 
                                data-placement={item.value} 
                                onMouseOver={(e) => { handleMouseOver(e.target.getAttribute('data-placement')) }} 
                                onMouseLeave={handleMouseLeave} 
                                onClick={(e) => { handleClick(e.target.getAttribute('data-placement')) }} 
                                points="58.67 91.97 23.07 110.68 29.87 71.04 1.07 42.97 40.87 37.19 58.67 1.13 76.47 37.19 116.26 42.97 87.47 71.04 94.26 110.68 58.67 91.97"
                            />
                        </svg>
                    )
                })}
            </span>
        </div>
    )
}

export { RatingSystem }; 