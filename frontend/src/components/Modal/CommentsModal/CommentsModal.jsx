import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    styled, TextField,
    Typography
} from "@mui/material";
import React, {useContext} from "react";
import CloseIcon from '@mui/icons-material/Close';
import styles from './comments.modal.css';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord.js";
import SendIcon from '@mui/icons-material/Send';
import {AuthContext} from "../../../App.jsx";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export const CommentsModal = ({open, setOpen, comments, setComments, post_id, setCounters}) => {
    const {user} = useContext(AuthContext);
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('user_id', user.id);
        formData.append('post_id', post_id);
        formData.append('content', event.target.content.value);

        const headers = {}
        headers.Authorization = `Bearer ${localStorage.getItem('jwtToken')}`;
        axios.post(`http://127.0.0.1:8000/api/comment`, formData, {headers})
            .then((response)=>{
                setComments((prev) => [response.data, ...prev]);
                setCounters((prevCounters) => ({
                    ...prevCounters,
                    comments: prevCounters.comments + 1,
                }));
            })
            .catch((error)=>{
                console.log(error);
            })

        event.target.content.value = '';
    }

    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Comments
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers className={"commentsModal__body"}>

                    <div className={"comments__list"}>
                        {comments.map((comment, idx)=> {
                            return (
                                <>
                                    <div key={idx} className={"comment"}>
                                        <div className={"user"}>
                                            <div className={"avatar"}>
                                                {
                                                    comment?.user.avatar_url !== ''
                                                        ? <Avatar src={`http://127.0.0.1:8000/storage/${comment?.user.avatar_url}`}></Avatar>
                                                        : <Avatar>{comment?.user.name[0]}</Avatar>
                                                }
                                            </div>
                                            <div className={"tweet__author"}>
                                                <div style={{color:"black"}}>{comment?.user.name}</div>
                                                <div><FiberManualRecordIcon sx={{fontSize: 5}}/></div>
                                                <div>{new Date(comment?.created_at).toLocaleString().slice(0,-3)}</div>
                                            </div>
                                        </div>
                                        <div className={"comment__content"}>{comment.content}</div>
                                    </div>
                                    <Divider sx={{borderWidth: .5, borderColor: "rgb(0, 0, 0)"}}/>
                                </>
                            );
                        })}
                    </div>
                </DialogContent>
                <form onSubmit={handleSubmit}>
                    <div className={"commentContent__input"}>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Write your comment"
                            name={"content"}
                            multiline
                            rows={2}
                            inputProps={{
                                maxLength: 300
                            }}
                            variant="standard"
                        />
                    </div>
                    <div className={"submit__btn"}>
                        <Button variant="contained" type={'submit'} endIcon={<SendIcon />}>
                            Send
                        </Button>
                    </div>
                </form>
            </BootstrapDialog>
        </React.Fragment>
    );

}
