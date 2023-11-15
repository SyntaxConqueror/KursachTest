import styles from './search.module.css';
import {TextField} from "@mui/material";
import {TweetItem} from "../Content/Home/TweetsList/TweetItem/TweetItem.jsx";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import {useEffect, useState} from "react";
import axios from "axios";
export const Search = () => {

    const [mostLikedPosts, setMostLikedPosts] = useState([]);
    const [mostRepostPosts, setMostRepostPosts] = useState([]);
    const getMostPosts = (param) => {
        axios.get(`http://127.0.0.1:8000/api/getMostPosts/${param}`)
            .then((response)=>{
                param === 'likes'
                    ? setMostLikedPosts(response.data)
                    : setMostRepostPosts(response.data);
            })
            .catch((error)=>{
                console.log(error);
            })
    }
    useEffect(() => {
        getMostPosts('likes');
        getMostPosts('reposts');
    }, []);

    return (
        <div className={styles.search__container}>
            {/*<div className={styles.search__field}>*/}
            {/*    <TextField*/}
            {/*        id="filled-search"*/}
            {/*        label="Search post"*/}
            {/*        type="search"*/}
            {/*        variant="filled"*/}
            {/*    />*/}
            {/*</div>*/}
            <div className={styles.trends}>
                <div className={styles.trends__header}>
                    <h4>Trends for you</h4>
                    <WhatshotIcon sx={{fill: "cornflowerblue"}}/>
                </div>

                <div className={styles.trends__repost}>
                    <h5>#Most reposted: </h5>
                    {mostRepostPosts.map((post, idx)=>{
                        return (
                            <TweetItem reduced={true} key={idx} tweetData={post}/>
                        )
                    })}
                </div>

                <div className={styles.trends__like}>
                    <h5>#Most liked: </h5>
                    {mostLikedPosts.map((post, idx)=>{
                        return (
                            <TweetItem reduced={true} key={idx} tweetData={post}/>
                        )
                    })}
                </div>


            </div>
        </div>
    )
}