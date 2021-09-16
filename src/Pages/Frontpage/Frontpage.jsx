import { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';

// Style
import Style from './Frontpage.module.scss';

// Components
import { HeroSlider } from '../../Components/HeroSlider/HeroSlider';
import { ListItems } from '../../Components/ListItems/ListItems';
import { EmployeesList } from '../../Components/EmployeesList/EmployeesList';
import { Reviews } from '../../Components/Reviews/Reviews';
import { Modal } from '../../Components/Modal/Modal';

// Helpers
import { doFetch } from '../../Helpers/Fetching';

// Context
import { AppContext } from '../../Context/ContextProvider';

const Frontpage = () => {
    const [selectedHouses, setSelectedHouses] = useState([]);
    const [reviews, setReviews] = useState([]);

    const timeoutRef = useRef(null);
    const [ sliderIndex, setSliderIndex ] = useState(0);

    const { loginData, setModalActive } = useContext(AppContext);
    const history = useHistory();


    const getSelectedHouses = async () => {
        const url = `https://api.mediehuset.net/homelands/homes`;
        const response = await doFetch(url);

        const arr = [];
        const uniqueNumber = getUniqueNumbers();
        uniqueNumber.forEach(number => arr.push(response[number]));
        setSelectedHouses(arr);
    }

    const getReviews = async () => {
        const url = `https://api.mediehuset.net/homelands/reviews`;
        const response = await doFetch(url);
        setReviews(response);
    }

    const getUniqueNumbers = () => {
        const arrOfNumbers = [];
        const quantity = 3;
        const max = 10;

        // while the array's length isn't as long as we want, this function will run.
        while (arrOfNumbers.length < quantity) {
            const randomNumber = Math.floor(Math.random() * max);

            // indexOf checks if the randomNumber is already in the array, and if it isn't it will push the randomNumber to the array.
            if(arrOfNumbers.indexOf(randomNumber) === -1) { arrOfNumbers.push(randomNumber) }
        }

        return arrOfNumbers;
    }

    const resetTimeout = () => {
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    const handleClick = () => {
        if(!loginData.user_id) {
            history.push('/Login')
        } else { setModalActive(true); };
    }


    useEffect(() => {
        getSelectedHouses();
        getReviews();
        setSliderIndex(1);
    }, [])

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => {
            setSliderIndex((prevIndex) => prevIndex >= reviews.length - 1 ? 0 : prevIndex + 1)
        }, [2000])

        return () => resetTimeout();
    }, [sliderIndex])

    return (
        <main className={Style.frontPage}>
            <HeroSlider />

            <section className={Style.frontPage_preview}>
                <ul className={Style.frontPage_preview_list}>
                    {selectedHouses.length ? selectedHouses.map((house, index) => {
                        return (
                            <li key={index}>
                                <ListItems data={house} />
                            </li>
                        )
                    }) : null}
                </ul>
            </section>

            <section className={Style.frontPage_reviews}>
                <header className={Style.frontPage_reviews_header} >
                    <h2>Det siger kunderne:</h2>
                </header>
                {reviews.length ? reviews.map((review, index) => {
                    return (
                        <Reviews key={index} data={review} style={sliderIndex === index ? true : false } />
                    )
                }) : null}
                <button onClick={handleClick} type="button">{loginData.user_id ? 'Skriv en anmeldelse her' : 'Login for at skrive en anmeldelse'}</button>
            </section>

            <section className={Style.frontPage_employees}>
                <header>
                    <h2>Mød vores ansatte</h2>
                </header>
                <EmployeesList />
            </section>
            
            <Modal />
        </main>
    )
}

export { Frontpage };