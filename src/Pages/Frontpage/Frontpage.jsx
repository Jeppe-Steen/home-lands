import { useEffect, useState } from 'react';

// Style
import Style from './Frontpage.module.scss';

// Components
import { HeroSlider } from '../../Components/HeroSlider/HeroSlider';
import { ListItems } from '../../Components/ListItems/ListItems';
import { EmployeesItem } from '../../Components/EmployeesItem/EmployeesItem';

// Helpers
import { doFetch } from '../../Helpers/Fetching';

const Frontpage = () => {
    const [employees, setEmployees] = useState([]);
    const [houses, setHouses] = useState([]);

    const getEmployees = async () => {
        const url = `https://api.mediehuset.net/homelands/staff`;
        const response = await doFetch(url);
        setEmployees(response);
    }

    const getHouses = async () => {
        const url = `https://api.mediehuset.net/homelands/homes`;
        const response = await doFetch(url);

        const slicedArray = response.slice(0,3)
        setHouses(slicedArray);
    } 

    useEffect(() => {
        getEmployees();
        getHouses();
    }, [])

    return (
        <main className={Style.frontPage}>
            <HeroSlider />

            <section className={Style.frontPage_preview}>
                <ul className={Style.frontPage_preview_list}>
                    {houses.length ? houses.map((house, index) => {
                        return (
                            <li>
                                <ListItems key={index} data={house} />
                            </li>
                        )
                    }) : null}
                </ul>
            </section>

            <section className={Style.frontPage_reviews}>
                <header>
                    <h2>Det siger kunderne:</h2>
                </header>
                <article className={Style.frontPage_reviews_review}>
                    <header><h3>Something important here..</h3></header>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, enim. Libero sint possimus inventore consequuntur consequatur. Ab, aspernatur, recusandae ea ullam hic minus aliquam accusamus, labore vel illum unde eligendi.</p>
                    <footer>Barack Obama, September 2021</footer>
                </article>
            </section>

            <section className={Style.frontPage_employees}>
                <header>
                    <h2>Mød vores ansatte</h2>
                </header>
                <ul className={Style.frontPage_employees_list}>
                    {employees.length ? employees.map((employee, index) => {
                        return (
                            <li>
                                <EmployeesItem key={index} data={employee} />
                            </li>
                        )
                    }): null}
                </ul>
            </section>
        </main>
    )
}

export { Frontpage };