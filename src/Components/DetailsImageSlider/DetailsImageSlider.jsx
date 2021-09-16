import { useContext, useState } from 'react';

// Context
import { AppContext } from '../../Context/ContextProvider';

// Style
import Style from './DetailsImageSlider.module.scss';

const DetailsImageSlider = () => {
    const { pictureActive, pictureArray } = useContext(AppContext);

    const [sliderIndex, setSliderIndex] = useState(0);

    const handleButton = (type) => {
        switch(type) {
            default:
                break;
            case 'prev':
                if(sliderIndex <= 0) { setSliderIndex(pictureArray.length -1) } else {setSliderIndex(sliderIndex - 1)}
                break;
            case 'next':
                if(sliderIndex >= pictureArray.length - 1) { setSliderIndex(0) } else {setSliderIndex(sliderIndex + 1)}
                break;
        }
    }

    return (
        <section className={pictureActive ? `${Style.detailsImageSlider} ${Style.active}` : `${Style.detailsImageSlider}`}>
            {pictureArray.length ? pictureArray.map((picture, index) => {
                return (
                    <img className={sliderIndex === index ? `${Style.detailsImageSlider_image} ${Style.detailsImageSlider_image_active}` : `${Style.detailsImageSlider_image}`} key={index} src={picture.filename.medium} alt={picture.file} />
                )
            }) : null}

            <button onClick={() => handleButton('prev')} className={pictureActive ? `${Style.prev} ${Style.active}` : `${Style.prev}`} type="button"></button>
            <button onClick={() => handleButton('next')} className={pictureActive ? `${Style.next} ${Style.active}` : `${Style.next}`} type="button"></button>
        </section>
    )
}

export { DetailsImageSlider };