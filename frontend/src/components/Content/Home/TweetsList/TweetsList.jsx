import styles from './tweetslist.module.css';

import {createContext, useEffect, useState} from "react";
import {TweetItem} from "./TweetItem/TweetItem.jsx";
import {Box, Button, CircularProgress} from "@mui/material";
import axios from "axios";


export const TweetsList = ({tweetsList, setTweetsList, setPage, page}) => {

    const handleClick = () => {
        setPage(page+1);
    }

    return tweetsList
        ? (
            <>
                <div className={styles.tweets__container}>
                    {tweetsList?.map((item, idx) => {
                        return (
                            <TweetItem setTweetsList={setTweetsList} key={idx} tweetData={item} />
                        )
                    })}
                </div>
                <div className={styles.see__more__btn}>
                    {tweetsList.length >= 50 ? <Button onClick={handleClick}>See more</Button> : ""}
                </div>
            </>
        ) : (
           <div className={styles.loading}>
               <CircularProgress />
           </div>
        )
}