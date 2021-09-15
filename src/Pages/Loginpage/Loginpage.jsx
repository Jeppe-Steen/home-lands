// Style
import Style from './Loginpage.module.scss';

import { doFetch } from '../../Helpers/Fetching'; 
import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/ContextProvider';
import { useHistory } from 'react-router';

const Loginpage = () => {
    const history = useHistory();
    const { loginData, setLoginData } = useContext(AppContext);

    let loginFormData = {
        username: '',
        password: ''
    };

    const handleChange = (field) => {
        if(field.name === 'username') { loginFormData.username = field.value }
        if(field.name === 'password') { loginFormData.password = field.value }
    };

    const resetInput = (e) => {
        e.target.value = '';
        e.target.style.borderColor = 'initial';

        const error_message = document.querySelector('.error_message');
        if(error_message) {
            error_message.remove();
        }
    };

    const handleError = (element, error_message) => {
        element.style.borderColor = 'red';
        const error = document.querySelector('.error_message');

        if(!error) {
            element.parentElement.insertAdjacentHTML('beforeend', `<p class="error_message">${error_message}</p>`);
        }
    };

    const handleLogin = async () => {
        const url = `https://api.mediehuset.net/token`;
        const formData = new FormData();
            formData.append('username', loginFormData.username);
            formData.append('password', loginFormData.password);

            const response = await doFetch(url, 'POST', formData);
            if(!response.user_id) { checkInfo(); } 
            else { 
                setLoginData(response); 
                history.push('/Admin'); 

                const data = JSON.stringify(response, null, 2);
                sessionStorage.setItem('access_token', data);
            }
    };

    const checkInfo = () => {
        const form = document.getElementById('form');

        if(!loginData.user_id) { handleError(form, 'Brugernavn eller adgangskode er forkert'); }
    };

    const submitForm = () => {
        const requiredInputs = [...document.querySelectorAll('.required')];

        let hasError = false;

        for (let input of requiredInputs) {
            if(!input.value) {
                hasError = true;
                handleError(input, 'Du skal udfylde feltet');
                return
            }
        }

        if(!hasError) {
            handleLogin();
        }
    };

    useEffect(() => {
        if(loginData.user_id) {
            history.push('/Admin');
        }
    }, [])


    return (
        <main className={Style.loginPage}>
            <header className={Style.loginPage_header}>
                <h2>Login</h2>
                <p>Indtast dit brugernavn og adgangskode for at logge ind</p>
            </header>

            <form id="form" className={Style.loginPage_form}>
                <span className={Style.loginPage_form_span}>
                    <label htmlFor="username">Brugernavn</label>
                    <input className="required" onFocus={(e) => resetInput(e)} onChange={(e) => handleChange(e.target)} name="username" type="text" />
                </span>
                <span className={Style.loginPage_form_span}>
                    <label htmlFor="password">Adgangskode</label>
                    <input className="required" onFocus={(e) => resetInput(e)} onChange={(e) => handleChange(e.target)} name="password" type="password" />
                </span>

                <span className={Style.loginPage_button_span}>
                    <button type="button">Annuller</button>
                    <button onClick={submitForm} type="button">Login</button>
                </span>
            </form>
        </main>
    )
}

export { Loginpage };