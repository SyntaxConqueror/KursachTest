import styles from './App.module.css'
import {Menu} from "./components/Menu/Menu.jsx";
import {Content} from "./components/Content/Content.jsx";
import {createContext, useEffect, useState} from "react";
import {Search} from "./components/Search/Search.jsx";
import 'bootstrap/dist/js/bootstrap.bundle.js';
import axios from "axios";

export const AuthContext = createContext(null);
function App() {

    const [activeComponent, setActiveComponent] = useState("Explore");

    const [userAuthorized, setUserAuthorized] = useState(!!localStorage.getItem('jwtToken'));
    const [user, setUser] = useState(null);

    const getUserData = () => {
        const headers = {};
        headers.Authorization = `Bearer ${localStorage.getItem('jwtToken')}`;

        axios.get('http://127.0.0.1:8000/api/getAccount', {headers})
            .then((response)=>{
                setUser(response.data);
            }).catch((error)=> {
                console.log(error);
            })
    }

    useEffect( () => {
        userAuthorized ? getUserData() : setUser(null);
    }, [userAuthorized]);

    return (
        <AuthContext.Provider value={{userAuthorized, setUserAuthorized, user}}>
            <div className={styles.main__container}>
                <Menu setActiveComponent={setActiveComponent} />
                <Content activeComponent={activeComponent} />
                <Search />
            </div>
        </AuthContext.Provider>
    )
}

export default App
