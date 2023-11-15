import styles from "./explore.module.css";
import {TweetsList} from "../Home/TweetsList/TweetsList.jsx";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {array} from "prop-types";
import {AuthContext} from "../../../App.jsx";

export const Explore = () => {

    const [tweetsList, setTweetsList] = useState([]);
    const [page, setPage] = useState(0);
    const getPosts = () => {
        axios.get(`http://127.0.0.1:8000/api/getPosts?page=${page}`).then((response)=>{
            setTweetsList((prevTweetsList) => [...prevTweetsList, ...response.data]);
        }).catch((error)=>{
            console.log(error);
        })
    }

    useEffect(() => {
        getPosts();
    }, [page]);


    return (
        <div className={styles.tweets__list}>
            <TweetsList page={page} setPage={setPage} tweetsList={tweetsList} setTweetsList={setTweetsList} />
        </div>
    )
}