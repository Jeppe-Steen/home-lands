import { useEffect, useState, useContext } from 'react';

// Style
import Style from './Catalogpage.module.scss';

// Helpers
import { doFetch } from '../../Helpers/Fetching';

// Components
import { ListItems } from '../../Components/ListItems/ListItems';
import { RangedSlider } from '../../Components/RangedSlider/RangedSlider';

// Context
import { AppContext } from '../../Context/ContextProvider';

const Catalogpage = () => {
    const [houses, setHouses] = useState([]);
    const [filteredHouses, setFilteredHouses] = useState([]);
    const [houseTypes, setHouseTypes] = useState([]);
    const [filter, setFilter] = useState('');

    const { searchData, setSearchData, setHighestPrice, minPrice, maxPrice} = useContext(AppContext);

    // getting data from api
    const getHouses = async () => {
        const url = `https://api.mediehuset.net/homelands/homes`;
        const response = await doFetch(url);

        let listOfTypes = [];
        response.forEach(element => listOfTypes.push(element.type));
        
        // removing duplicated occurrance in the response, so I get a list of each unique value
        let shortList = [...new Set(listOfTypes)];
        setHouseTypes(shortList);
        
        // sorting the data for prices (lowest first), and setting them
        response.sort((a, b) => {return parseInt(a.price) - parseInt(b.price)});
        setHouses(response);
        setFilteredHouses(response);
    };

    // getting data from api
    const searchHouses = async () => {
        // if the user has searched with something, then it will search the api, else it will get the default list
       if(searchData.length) {
            const url = `https://api.mediehuset.net/homelands/search/${searchData}`;
            const response = await doFetch(url);
            setHouses(response);
            setFilteredHouses(response);
       } else {
           getHouses();
       }
    };

    // using an array to sort for the highest price, and the setting the highest price.
    const settingHighestPrice = (arra) => {
        const sortetHouses = arra.sort((a, b) => { return parseFloat(a.price) - parseFloat(b.price) })
        let arr = [];

        sortetHouses.forEach(element => arr.push(parseInt(element.price)));
        setHighestPrice(arr[arr.length - 1]);
    };

    useEffect(() => {
        if(searchData.length) {
            searchHouses();
            setSearchData('');
        } else {
            getHouses();
        }
    }, []);

    // using the search function
    useEffect(() => {
        searchHouses();
    }, [searchData]);

    // filtering data
    useEffect(() => {
        if(filter === 'all') { setFilteredHouses(houses); }
        else {
            const filteredData = houses.filter(elements => elements.type === filter);
            setFilteredHouses(filteredData);
        }
    }, [filter]);

    // setting the highest price after each filter
    useEffect(() => {
        settingHighestPrice(filteredHouses);
    }, [filteredHouses])

    return (
        <main className={Style.catalogPage}>
            <header className={Style.catalogPage_header}>
                <h2>Boliger tilsalg</h2>
                <div className={Style.catalogPage_header_sorting}>
                    <span className={Style.catalogpage_header_slider}>
                        <label>Sorter efter prisniveau:</label>
                        <RangedSlider />
                    </span>
                    <select className={Style.catalogPage_header_sorting_select} onChange={(e) => setFilter(e.target.value)}>
                        <option value="" selected disabled>Sorter efter type</option>
                        <option value="all">Alle typer</option>
                        {houseTypes.length ? houseTypes.map((type, index) => {
                            return (
                                <option key={index} value={type}>{type}</option>
                            )
                        }) : null}
                    </select>
                </div>
            </header>

            <section className={Style.catalogPage_section}>
                <ul>
                    {filteredHouses.length ? filteredHouses.map((house, index) => {
                        if(parseInt(house.price) <= maxPrice && parseInt(house.price) >= minPrice) {
                            return (
                                <ListItems key={index} data={house}/>
                            )
                        } else { return null }
                    }) : null}
                </ul>
            </section>
        </main>
    )
}

export { Catalogpage };