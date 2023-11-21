import styles from "./explore.module.css";
import {TweetsList} from "../Home/TweetsList/TweetsList.jsx";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import EventEmitter2 from "eventemitter2";

export const exploreEmitter = new EventEmitter2();
export const Explore = () => {

    const [tweetsList, setTweetsList] = useState([]);
    const [page, setPage] = useState(1);
    const getPosts = () => {
        axios.get(`http://127.0.0.1:8000/api/getPosts?page=${page}`)
            .then((response)=>{
                console.log('Hello get posts')
                setTweetsList((prevTweetsList) => [...prevTweetsList, ...response.data]);
            }).catch((error)=> {
                console.log(error);
            })
    }

    const getLastPosts = (event) => {
        const post = event['post'];
        console.log(post)
        if(!post) {
            return;
        }
        setTweetsList((prevTweetsList) => prevTweetsList.map((tweet, idx) => {
            if(tweet.id === event['post'].id) {
                console.log(post, tweet);
                return {...tweet, ...post}
            }
            return tweet;
        }))

    }

    useEffect(() => {
        exploreEmitter.on('exploreSet', getLastPosts)
        getPosts();

        return () => {
            exploreEmitter.off('exploreSet', getLastPosts);
        };
    }, [page]);

    console.log(tweetsList)

    return (
        <div className={styles.tweets__list}>
            <TweetsList page={page} setPage={setPage} tweetsList={tweetsList} setTweetsList={setTweetsList} />
        </div>
    )
}