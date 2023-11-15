import styles from './home.module.css';
import {Avatar, Button, TextField} from "@mui/material";
import {createContext, useContext, useEffect, useRef, useState} from "react";
import {TweetsList} from "./TweetsList/TweetsList.jsx";
import {AuthContext} from "../../../App.jsx";
import axios from "axios";
import {EventModal} from "../../Modal/EventModal.jsx";

export const UserDataContext = createContext({});
export const Home = () => {

    const { user } = useContext(AuthContext);

    const [userPosts, setUserPosts] = useState(null);
    const [page, setPage] = useState(0);

    const [openModal, setOpenModal] = useState(false);
    const [responseMessage, setResponseMessage] = useState({
        title: '',
        content: ''
    });

    const headers = {Authorization: `Bearer ${localStorage.getItem('jwtToken')}`}
    
    const getUserPosts = () => {
        axios.get(`http://127.0.0.1:8000/api/getUserPosts/${user.id}?page=${page}`, {headers})
            .then((response)=>{
                setUserPosts(response.data);
            }).catch((error)=>{
                console.log(error);
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("user_id", user.id);
        formData.append("content", event.target.content.value);

        axios.post(`http://127.0.0.1:8000/api/createPost`, formData, {headers})
            .then((response)=> {
                setUserPosts((prev) => [response.data.post, ...prev]);
                setResponseMessage({title: "Create post", content: "Your post was successfully created!"})
            })
            .catch((error)=>{
                setResponseMessage({title: "Error", content: `Some error occured! ${error}`})
                setOpenModal(true);
            })

        event.target.content.value = '';
    }


    useEffect(()=> {
        if(user) getUserPosts();
    }, [user])

    return user
        ? (
            <UserDataContext.Provider value={{user}}>
            <div className={styles.home__container}>
                <form onSubmit={handleSubmit} className={styles.tweet__component}>
                    <div className={styles.avatar}>
                        {
                            user !== null && user?.avatar_url !== ''
                                ? <Avatar src={`http://127.0.0.1:8000/storage/${user?.avatar_url}`}></Avatar>
                                : <Avatar>{user?.name[0].toUpperCase()}</Avatar>
                        }
                    </div>
                    <div className={styles.post}>
                        <div className={styles.post__text__field}>
                            <TextField
                                id="standard-multiline-flexible"
                                label="What's happening?"
                                name={"content"}
                                sx={{width: "95%"}}
                                multiline
                                rows={4}
                                inputProps={{
                                    maxLength: 300
                                }}
                                variant="standard"
                            />
                        </div>
                    </div>
                    <div className={styles.tweet__btn}>
                        <Button type={"submit"} variant="contained">Tweet</Button>
                    </div>
                </form>
                <div>
                    <TweetsList
                        page={page}
                        setPage={setPage}
                        tweetsList={userPosts}
                        setTweetsList={setUserPosts} />
                </div>
                <EventModal open={openModal} setOpen={setOpenModal} data={responseMessage}/>
            </div>
            </UserDataContext.Provider>
        ) : (
                <div className={styles.home__unauthorized}>You need to be authorized</div>
        )
}