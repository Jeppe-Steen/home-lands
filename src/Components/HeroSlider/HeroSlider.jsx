import { useEffect, useState } from 'react';
import Style from './HeroSlider.module.scss'

const HeroSlider = () => {
    const [selectedImage, setSelectedImage] = useState({});
    const [imageArr, setImageArr] = useState([]);

    const imageArray = [
        { id: 0, title: 'this', selected: true, src: 'https://ironcodestudio.com/wp-content/uploads/2015/03/css-remove-horizontal-scrollbar.jpg' },
        { id: 1, title: 'is', selected: false, src: 'https://cdn.pixabay.com/photo/2017/05/08/08/08/landscape-2294711_960_720.jpg' },
        { id: 2, title: 'awesome', selected: false, src: 'https://www.investopedia.com/thmb/16FgGW3XMVGQ-4w4epjfT0VIMuw=/680x0/filters:no_upscale():max_bytes(150000):strip_icc()/merger_jigsaw-5bfc2fc646e0fb0051be9cb6.jpg' }
    ];

    const timer = 2000;
    let imageIndex = 0;

    const changeDotColor = (val) => {
        imageArray.forEach(image => image.selected = false);
        imageArray[val].selected = true;

        setImageArr(imageArray);
    }

    const timedSliderFunction = () => {
        if(imageIndex <= imageArray.length - 2) {
            imageIndex = imageIndex + 1;
        } else if (imageIndex >= imageArray.length - 1) {
            imageIndex = 0;
        }
        
        changeDotColor(imageIndex)
        setSelectedImage(imageArray[imageIndex]);
    }

    useEffect(() => {
        changeDotColor(imageIndex)
        setSelectedImage(imageArray[0])
        setInterval(timedSliderFunction, timer);
        clearInterval();
    }, [])

    return (
        <section className={Style.heroSlider}>
            <figure className={Style.heroSlider_figure}>
                <img className={Style.heroSlider_img} src={selectedImage.src} alt="" />
                <figcaption className={Style.heroSlider_figcap}>
                    <h1 className={Style.heroSlider_h1}> {selectedImage.title} </h1>
                </figcaption>
            </figure>
            { /*<div className={Style.heroSlider_dotsSpan}>
                {imageArr && imageArr.map((dot, index) => {
                 return (
                    <div key={index} className={dot.selected ? `${Style.heroSlider_dots} ${Style.active}` : Style.heroSlider_dots}></div>
                 )   
                })}
            </div> */}
        </section>
    )
}

export { HeroSlider };