// Style
import { useEffect } from 'react';
import Style from './DetailsList.module.scss';

const DetailsList = (props) => {

    const data = props.data;

    const formatDate = (val) => {
        const formattetDate = new Date(val * 1000);
        console.log(formattetDate);
    }

    const dataArray = [
        { value: data.id, print: 'Sagsnr.', prefix: '' },
        { value: data.floor_space, print: 'Boligareal', prefix: 'm2' },
        { value: data.ground_space, print: 'Grundareal', prefix: 'm2' },
        { value: data.num_rooms, print: 'Antal rum', prefix: '' },
        { value: data.num_floors, print: 'Antal plan', prefix: '' },
        { value: data.basement_space, print: 'Kælder', prefix: 'm2' },
        { value: data.year_construction, print: 'Byggeår', prefix: '' },
        { value: data.year_rebuilt, print: 'Ombygget', prefix: '' },
        { value: data.energy_label_name, print: 'Energimærke', prefix: '' },
        { value: data.date_stamp, print: 'Liggetid', prefix: 'dage' },
        { value: data.price, print: 'Kontantpris', prefix: '' },
        { value: data.payout, print: 'Udbetaling', prefix: '' },
        { value: data.gross, print: 'Brutto ex. ejerudgift', prefix: '' },
        { value: data.net, print: 'Netto ex. ejerudgift', prefix: '' },
        { value: data.cost, print: 'Ejerudgift', prefix: '' },
    ]

    useEffect(() => {
    }, []);


    return (
        <ul className={Style.detailsList}>
            {dataArray.length ? dataArray.map((listItem, index) => {
                return (
                    <li key={index}>
                        <p>{listItem.print}</p>
                        <p>{listItem.value} {listItem.prefix}</p>
                    </li>
                )
            }) : null}
        </ul>
    )
}

export { DetailsList };