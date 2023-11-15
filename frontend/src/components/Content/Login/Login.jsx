import styles from './login.module.css';
import {Box, Button, styled, Tab, Tabs, TextField, Typography} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React from "react";
import PropTypes from "prop-types";
import {RegisterForm} from "./RegisterForm/RegisterForm.jsx";
import {LoginForm} from "./LoginForm/LoginForm.jsx";


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


function VisuallyHiddenInput(props) {
    return null;
}

VisuallyHiddenInput.propTypes = {type: PropTypes.string};
export const Login = () => {

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Login" {...a11yProps(0)} />
                    <Tab label="Register" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <LoginForm />
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
                <RegisterForm />
            </CustomTabPanel>

        </>

    )
}