import { useEffect, useRef, useState } from 'react';
import Style from './HeroSlider.module.scss'

import {doFetch} from '../../Helpers/Fetching';

const HeroSlider = () => {
    const [imageArray, setImageArray] = useState([]);
    const [sliderIndex, setSliderIndex] = useState(0);

    const timeoutRef = useRef(null);

    const getImages = async () => {
        const url = `https://api.mediehuset.net/homelands/images`
        const response = await doFetch(url);
        setImageArray(response);
    }

    const handleButton = (val) => {
        switch(val) {
            default:
                break;
            case 'next':
                if(sliderIndex >= imageArray.length - 1) {
                    setSliderIndex(0);
                } else {
                    setSliderIndex(sliderIndex + 1);
                }
                break;
            case 'prev':
                if(sliderIndex <= 0) {
                    setSliderIndex(imageArray.length - 1)
                } else {
                    setSliderIndex(sliderIndex - 1)
                }
                break;
        }
    }
    
    useEffect(() => {
        getImages();
        setSliderIndex(1);
    }, [])

    const resetTimeout = () => {
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => {
            setSliderIndex((prevIndex) => 
                prevIndex >= imageArray.length - 1 ? 0 : prevIndex + 1
            )
        }, 2000);
        return () => { resetTimeout(); };
    }, [sliderIndex]);

    return (
        <section className={Style.heroSlider}>
            {imageArray.length ? imageArray.map((image, index) => {
                return (
                    <img key={index} className={sliderIndex === index ? `${Style.heroSlider_image} ${Style.active}` : `${Style.heroSlider_image}`} src={image.image[1]} alt={image.filename} />
                )
            }) : null}

            <button onClick={() => handleButton('prev')} className={Style.prev} type="button"></button>
            <button onClick={() => handleButton('next')} className={Style.next} type="button"></button>
        </section>
    )
}

export { HeroSlider };