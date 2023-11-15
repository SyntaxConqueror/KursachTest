import styles from './content.module.css';
import {Home} from "./Home/Home.jsx";
import {Explore} from "./Explore/Explore.jsx";
import {Login} from "./Login/Login.jsx";

export const Content = ({activeComponent}) => {
    return (
        <div className={styles.content__container}>
            <div className={styles.header}>{activeComponent}</div>
            {activeComponent === "Home" && <Home />}
            {activeComponent === "Explore" && <Explore />}
            {activeComponent === "Login / Register" && <Login />}
        </div>
    )
}