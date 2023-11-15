import styles from './menu.module.css';
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {CollapsedNav} from "./CollapsedNav/CollapsedNav.jsx";
import axios from "axios";
import {EventModal} from "../Modal/EventModal.jsx";
import {useContext, useState} from "react";
import {AuthContext} from "../../App.jsx";
export const Menu = ({setActiveComponent}) => {

    const [openModal, setOpenModal] = useState(false);
    const [responseMessage, setResponseMessage] = useState({
        title: '',
        content: ''
    })
    const { userAuthorized, setUserAuthorized } = useContext(AuthContext);

    const handleLogoutClick = () => {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
        }

        axios.get('http://127.0.0.1:8000/api/logout', {headers})
            .then((response) => {
                localStorage.removeItem('jwtToken');

                setResponseMessage({
                    title: "Logout",
                    content: `${response.data.message}`
                });
                setUserAuthorized(false);
            })
            .catch((error) => {
                if(error.response.status === 401){
                    setResponseMessage({title: "Logout", content: "You can not logout. You are not authorized!"})
                }
            })

        setOpenModal(true);
    }



    return (
        <div className={styles.menu__container}>
            <div className={styles.menu}>
                <div className={styles.menu__item__logo}>
                    <TwitterIcon sx={{ fontSize: 50 }} color='primary' />
                    <CollapsedNav setActiveComponent={setActiveComponent} />
                </div>

                {[
                    { component: "Home", icon: <HomeIcon sx={{ fontSize: 30 }} />, label: "Home" },
                    { component: "Explore", icon: <TagIcon sx={{ fontSize: 30 }} />, label: "Explore" },
                    { component: "Login / Register", icon: <LoginIcon sx={{ fontSize: 30 }} />, label: "Login / Register" },
                ].map((item, index) => (
                    <div
                        key={index}
                        className={styles.menu__item}
                        onClick={() => setActiveComponent(item.component)}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </div>
                ))}
                <div onClick={handleLogoutClick} className={styles.menu__item}>
                    <LogoutIcon sx={{ fontSize: 30 }} />
                    <span>Logout</span>
                </div>
                <EventModal open={openModal} setOpen={setOpenModal} data={responseMessage} />
            </div>
        </div>
    )
}