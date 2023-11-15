import styles from "./tweetItem.module.css";
import {Avatar} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord.js";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline.js";
import RepeatIcon from "@mui/icons-material/Repeat.js";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder.js";
import ReplyIcon from '@mui/icons-material/Reply';
import React, {useContext, useState} from "react";
import axios from "axios";
import {EventModal} from "../../../../Modal/EventModal.jsx";
import {AuthContext} from "../../../../../App.jsx";
import {CommentsModal} from "../../../../Modal/CommentsModal/CommentsModal.jsx";



export const TweetItem = ({reduced, tweetData, setTweetsList}) => {

    const {user} = useContext(AuthContext);
    const [counters, setCounters] = useState({
        likes: tweetData?.likes_count,
        reposts: tweetData?.reposts_count,
        comments: tweetData?.comments_count,
    })
    const [toogledAction, setToogledAction] = useState({
        comment: false,
        repost: false,
        like: false,
    });

    const [openModal, setOpenModal] = useState(false);
    const [openComments, setOpenComments] = useState(false);

    const [responseMessage, setResponseMessage] = useState({
        title: '',
        content: '',
    })
    const [comments, setComments] = useState([]);

    const toggleAction = (action, property, value) => {
        const toggledAct = { ...action };
        toggledAct[property] = value;
        setToogledAction(toggledAct);
    };

    const getComments = () => {
        const headers = {}
        headers.Authorization = `Bearer ${localStorage.getItem('jwtToken')}`
        axios.get(`http://127.0.0.1:8000/api/getComments/${tweetData?.id}`, {headers})
            .then((response)=>{
                setComments(response.data);
                setOpenComments(true);
            })
            .catch((error)=>{
                setResponseMessage({title: "Error", content: `Some error occured! \n${error.response.data.message}`})
                setOpenModal(true);
                return '';
            })
    }

    const handleClick = async (route) => {

        const formData = new FormData();
        formData.append('post_id', tweetData?.id);
        formData.append('user_id', user.id);

        const headers = {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
        }

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/${route}`, formData, { headers });
            return response.data;
        } catch (error) {
            setResponseMessage({title: "Error", content: `Some error occured! \n${error.response.data.message}`})
            setOpenModal(true);
            return '';
        }
    }

    const createActionButton = (property, icon, count, fill_color) => (
        <div
            onClick={async () => {
                toggleAction(toogledAction, property, !toogledAction[property]);
                const propertyToCounter = {
                    like: 'likes',
                    repost: 'reposts',
                };
                if(!propertyToCounter.hasOwnProperty(property)) {
                    if(property === 'comment') {
                        return getComments();
                    }
                }
                const response = await handleClick(property);

                if (propertyToCounter[property]) {
                    const updatedCounters = { ...counters };
                    updatedCounters[propertyToCounter[property]] += response.action === 'added' ? 1 : -1;
                    setCounters(updatedCounters);
                }
            }}
            className={styles[property]}
        >
            <div>{React.cloneElement(icon)}</div>
            <div>{count}</div>
        </div>
    );

    return (
        <div className={styles.tweet__item} >
            <div className={styles.avatar}>
                {
                    tweetData?.user.avatar_url !== ''
                        ? <Avatar src={`http://127.0.0.1:8000/storage/${tweetData?.user.avatar_url}`}></Avatar>
                        : <Avatar>{tweetData?.user.name[0]}</Avatar>
                }
            </div>
            <div className={styles.tweet__content}>

                <div className={styles.tweet__author}>
                    <div style={{color:"black"}}>{tweetData?.user.name}</div>
                    <div><FiberManualRecordIcon sx={{fontSize: 5}}/></div>
                    <div>{new Date(tweetData?.created_at).toLocaleString().slice(0,-3)}</div>

                    {
                        tweetData?.post
                            ? (
                                <>
                                    <div><ReplyIcon sx={{fontSize: 20}}/></div>
                                    <div>reposted from: {tweetData?.post?.user?.name}</div>
                                </>

                            )
                            : ""
                    }
                </div>

                <div
                    dangerouslySetInnerHTML={{__html: tweetData?.content || tweetData?.post?.content }}
                    className={ !reduced ? styles.tweet__text : styles.reducedTweet_text}>
                </div>
                {
                    tweetData?.post
                        ? ""
                        : <div className={styles.tweet__actions}>
                            {createActionButton("comment", <ChatBubbleOutlineIcon />, counters.comments)}
                            {createActionButton("repost", <RepeatIcon />, counters.reposts)}
                            {createActionButton("like", <FavoriteBorderIcon />, counters.likes, "cornflowerblue")}
                        </div>
                }
                <CommentsModal
                    open={openComments}
                    setOpen={setOpenComments}
                    comments={comments}
                    setComments={setComments}
                    post_id={tweetData?.id}
                    setCounters={setCounters}
                />
                <EventModal open={openModal} setOpen={setOpenModal} data={responseMessage}/>
            </div>
        </div>
    )
}