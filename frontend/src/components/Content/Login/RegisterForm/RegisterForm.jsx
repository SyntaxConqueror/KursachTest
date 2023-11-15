import styles from "../login.module.css";
import {Alert, Button, TextField} from "@mui/material";
import React, {useContext, useState} from "react";
import axios from "axios";
import {EventModal} from "../../../Modal/EventModal.jsx";
import {AuthContext} from "../../../../App.jsx";

export const RegisterForm = () => {

    const [showModal, setShowModal] = useState(false);
    const [responseMessage, setResponseMessage] = useState({
        title: null,
        content: null,
    });
    const { userAuthorized, setUserAuthorized } = useContext(AuthContext);
    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("nickname", event.target.nickname.value);
        formData.append("name", event.target.name.value);
        formData.append("email", event.target.email.value);
        formData.append("password", event.target.password.value);
        formData.append("avatar_file", event.target.avatar.files[0]);

        axios.post('http://127.0.0.1:8000/api/register', formData)
            .then((response)=>{
                setShowModal(true);

                const updatedResponseMessage = {...responseMessage};
                updatedResponseMessage.title = 'Registration';
                updatedResponseMessage.content = response.data.message;
                setResponseMessage(updatedResponseMessage);

                localStorage.setItem('jwtToken', response.data.token);
                setUserAuthorized(true);
            })

        event.target.nickname.value = '';
        event.target.name.value = '';
        event.target.email.value = '';
        event.target.password.value = '';
        event.target.avatar.value = '';
    }

    return (
        <form onSubmit={handleSubmit} className={styles.login__container}>
            <TextField
                required
                id="filled-basic"
                name={"nickname"}
                label="Nickname"
                variant="filled"
                inputProps={{
                    minLength: 3,
                    maxLength: 100,
                }}/>
            <TextField
                required
                id="filled-basic"
                name={"name"}
                aria-valuemax={5}
                label="Full name"
                variant="filled"
                inputProps={{
                    minLength: 6,
                    maxLength: 100,
                }}/>
            <TextField required id="filled-basic" name={"email"} type={'email'} label="Email" variant="filled" />
            <TextField
                required
                id="filled-basic"
                name={"password"}
                type={'password'}
                label="Password"
                variant="filled"
                inputProps={{
                    minLength: 6,
                }}/>
            <div className="mb-3">
                <label htmlFor="formFile" className="form-label" style={{paddingLeft: ".7em"}}>Choose the avatar</label>
                <input name="avatar" className="form-control" type="file" accept={".jpg, .jpeg, .png"} id="formFile"/>
            </div>
            <Button variant="contained" type={"submit"}>Register</Button>
            <EventModal open={showModal} setOpen={setShowModal} data={responseMessage}/>
        </form>

    );
}