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
    const [priceFilteredHouses, setPriceFilteredHouses] = useState([]);
    const [houseTypes, setHouseTypes] = useState([]);
    const [filter, setFilter] = useState('');

    const [minVal, setMinVal] = useState(0);
    const [maxVal, setMaxVal] = useState(0);

    const { searchData, setSearchData } = useContext(AppContext);

    const getHouses = async () => {
        const url = `https://api.mediehuset.net/homelands/homes`;
        const response = await doFetch(url);

        let listOfTypes = [];
        response.forEach(element => listOfTypes.push(element.type));
        
        let shortList = [...new Set(listOfTypes)];
        setHouseTypes(shortList);
        
        setHouses(response);
        setFilteredHouses(response);

    }

    const searchHouses = async () => {
       if(searchData.length) {
            const url = `https://api.mediehuset.net/homelands/search/${searchData}`;
            const response = await doFetch(url);
            setHouses(response);
            setFilteredHouses(response);
       } else {
           getHouses();
       }
    }

    useEffect(() => {
        if(searchData.length) {
            searchHouses();
            setSearchData('');
        } else {
            getHouses();
        }
    }, [])

    useEffect(() => {
        searchHouses();
    }, [searchData])

    useEffect(() => {
        if(filter === 'all') { setFilteredHouses(houses) }
        else {
            const filteredData = houses.filter(elements => elements.type === filter);
            setFilteredHouses(filteredData);
        }
    }, [filter])

    return (
        <main className={Style.catalogPage}>
            <header className={Style.catalogPage_header}>
                <h2>Boliger tilsalg</h2>
                <div className={Style.catalogPage_header_sorting}>
                    <span className={Style.catalogpage_header_slider}>
                        <label>Sorter efter prisniveau:</label>
                        <RangedSlider houses={filteredHouses} setMinVal={setMinVal} setMaxVal={setMaxVal} />
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
                        if(house.price >= minVal) {
                            return (
                                <ListItems key={index} data={house}/>
                            )
                        } else { return false }
                    }) : null}
                </ul>
            </section>
        </main>
    )
}

export { Catalogpage };