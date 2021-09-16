
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

// Components
import { DetailsImageSlider } from '../../Components/DetailsImageSlider/DetailsImageSlider';
import { DetailsList } from '../../Components/DetailsList/DetailsList';

// Style
import Style from './Detailspage.module.scss';

// Context
import { AppContext } from '../../Context/ContextProvider';

// Assets
import { Camera, Location, Plan, Heart } from '../../Assets/Icons';

// Helpers
import { doFetch } from '../../Helpers/Fetching';

const Detailspage = () => {
    const { selectedHouse, loginData, setPictureArray, pictureActive, setPictureActive } = useContext(AppContext);
    const [houseDetails, setHouseDetails] = useState({});

    const history = useHistory();

    const getHouseDetails = async () => {
        const url = `https://api.mediehuset.net/homelands/homes/${selectedHouse.id}`;
        const response = await doFetch(url);
        setHouseDetails(response);
        setPictureArray(response.images);
    }

    const handleClick = (type) => {
        switch(type) {
            default:
                break;
            case 'camera':
                setPictureArray(houseDetails.images);
                setPictureActive(true);
                break;
            case 'plan':
                setPictureArray([{
                    file: 'floorplan.png',
                    filename: {
                        medium: houseDetails.floorplan,
                        large: houseDetails.floorplan,
                    }
                }]);
                setPictureActive(true);
                break;
            case 'location':
                break;
        }
    }
    

    useEffect(() => {
        console.log(selectedHouse);
        getHouseDetails();

        if(!selectedHouse.address) {
            history.push('/Udvalg');
        }

        setPictureActive(false);
        console.log(houseDetails);
    }, []);



    return (
        <main className={pictureActive ? `${Style.detailsPage} ${Style.active}` : `${Style.detailsPage}`}>
            <DetailsImageSlider />
            
            <section className={Style.detailsPage_information}>
                <article className={Style.detailsPage_information_wrapper}>
                    <header className={Style.detailsPage_information_wrapper_header}>
                        <span>
                            <h2>{selectedHouse.address}</h2>
                            <p>{selectedHouse.city} {selectedHouse.zipcode}</p>
                            <p>{selectedHouse.type} | {selectedHouse.floor_space}m2 | {selectedHouse.num_rooms} vær</p>
                            <p>Set {selectedHouse.num_clicks} gange</p>
                        </span>

                        <span>
                            <div onClick={() => handleClick('camera')}><Camera /></div>
                            <div onClick={() => handleClick('plan')}><Plan /></div>
                            <div onClick={() => handleClick('location')}><Location /></div>
                            {loginData.user_id ? <div><Heart data={houseDetails.id} /></div> : null}
                        </span>

                        <span>
                            <h3>Kontantpris: {selectedHouse.price}</h3>
                            <p>Udbetaling {selectedHouse.payout}</p>
                            <p>Ejerudgift pr. måned {selectedHouse.cost}</p>
                        </span>
                    </header>

                    <DetailsList data={houseDetails}/>

                    {houseDetails.id ? 
                        <div className={Style.information}>
                            <p className={Style.information_text}>
                                {houseDetails && houseDetails.description.slice(0, 1500)}...
                            </p>

                            <figure className={Style.information_contact}>
                                <header>
                                    <h3>Kontakt</h3>
                                </header>
                                <img src={houseDetails.staff.image} alt={houseDetails.staff.firstname} />
                                <figcaption>
                                    <h4>{houseDetails.staff.firstname} {houseDetails.staff.lastname}</h4>
                                    <p>{houseDetails.staff.position}</p>
                                    <p>Email: {houseDetails.staff.email}</p>
                                    <p>Mobil: {houseDetails.staff.phone}</p>
                                </figcaption>
                            </figure>
                        </div>
                    : null}

                </article>
            </section>
        </main>
    )
}

export { Detailspage };