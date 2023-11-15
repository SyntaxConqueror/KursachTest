import styles from "../login.module.css";
import {Button, TextField} from "@mui/material";
import React, {useContext, useState} from "react";
import axios from "axios";
import {EventModal} from "../../../Modal/EventModal.jsx";
import {AuthContext} from "../../../../App.jsx";

export const LoginForm = () => {
    const [openModal, setOpenModal] = useState(false);
    const [responseMessage, setResponseMessage] = useState({
        title: '',
        content: '',
    })
    const { userAuthorized, setUserAuthorized } = useContext(AuthContext);
    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("email", event.target.email.value);
        formData.append("password", event.target.password.value);

        axios.post('http://127.0.0.1:8000/api/login', formData)
            .then((response)=> {

                if (localStorage.getItem('jwtToken')) {
                    setResponseMessage({
                        title: 'Login',
                        content: 'Your session was refreshed',
                    });
                } else {
                    localStorage.setItem('jwtToken', response.data.token);
                    setResponseMessage({
                        title: 'Login',
                        content: response.data.message
                    });
                }
                setOpenModal(true);
                setUserAuthorized(true);
            });

        event.target.email.value = '';
        event.target.password.value = '';
    }

    return (
        <form onSubmit={handleSubmit} className={styles.login__container}>
            <TextField name={"email"} id="filled-basic" label="Email" variant="filled" />
            <TextField
                name={"password"}
                id="filled-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="filled"
            />
            <Button variant="contained" type={"submit"}>Login</Button>
            <EventModal open={openModal} setOpen={setOpenModal} data={responseMessage} />
        </form>
    );
}