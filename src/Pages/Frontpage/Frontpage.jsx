import { useEffect, useState } from 'react';

// Style
import Style from './Frontpage.module.scss';

// Components
import { HeroSlider } from '../../Components/HeroSlider/HeroSlider';
import { ListItems } from '../../Components/ListItems/ListItems';

// Helpers
import { doFetch } from '../../Helpers/Fetching';
import { EmployeesList } from '../../Components/EmployeesList/EmployeesList';
import { Reviews } from '../../Components/Reviews/Reviews';
import { useContext } from 'react/cjs/react.development';
import { AppContext } from '../../Context/ContextProvider';

const Frontpage = () => {
    const [selectedHouses, setSelectedHouses] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);


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

    const timer = () => {
        if(selectedIndex >= reviews.length - 1) {
            setSelectedIndex(0)
        } else {
            setSelectedIndex(selectedIndex + 1)
        }
    }

    useEffect(() => {
        getSelectedHouses();
        getReviews();
        setSelectedIndex(0);

        setInterval(() => {
            timer();
        }, 1500);
        return () => clearInterval(); 
    }, [])

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
                <header>
                    <h2>Det siger kunderne:</h2>
                </header>
                {reviews.length ? reviews.map((review, index) => {
                    return (
                        <Reviews key={index} data={review} style={selectedIndex === index ? true : false } />
                    )
                }) : null}
            </section>

            <section className={Style.frontPage_employees}>
                <header>
                    <h2>Mød vores ansatte</h2>
                </header>
                <EmployeesList />
            </section>
        </main>
    )
}

export { Frontpage };