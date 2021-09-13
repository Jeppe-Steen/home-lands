import { useState } from 'react';

// Style
import Style from './EmployeesItem.module.scss';

const EmployeesItem = (props) => {
    const data = props.data;

    const [mouseEnter, setMouseEnter] = useState(false);

    const handleMouse = (hovering) => {
        hovering ? setTimeout(() => {
            setMouseEnter(true);
        }, [200]) : setMouseEnter(false);
    }

    return (
        <figure className={Style.employeesItem} onMouseEnter={() => handleMouse(true)} onMouseLeave={() => handleMouse(false)}>
            <img src={data.image} alt={data.firstname}  className={Style.employeesItem_image}/>
            <figcaption className={Style.employeesItem_caption}>
                <h3>{data.firstname} {data.lastname}</h3>
                <p>{data.position}</p>
                {mouseEnter ? <p>Email: {data.email}</p> : null}
                {mouseEnter ? <p>Mobil: {data.phone}</p> : null}
            </figcaption>
        </figure>
    )
}

export { EmployeesItem };