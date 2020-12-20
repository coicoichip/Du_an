import React, { useState } from "react";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { DEFAULT_AVATAR } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { createComment } from "../../redux/comments";

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  smallAvatar: {
    width: 25,
    height: 25,
  },
  commentField: {
    width: "96%",
  },
  commentText: {
    backgroundColor: "white",
    padding: theme.spacing(1),
    margin: `2px ${theme.spacing(2)}px 2px 2px`,
  },
  commentDate: {
    display: "block",
    color: "gray",
    fontSize: "0.8em",
  },
  commentDelete: {
    fontSize: "1.6em",
    verticalAlign: "middle",
    cursor: "pointer",
  },
}));

export default function Comments(props) {
  const classes = useStyles();
  const [text, setText] = useState("");
  const auth = useSelector((s) => s.auth);
  const comments = useSelector((s) => s.comments);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setText(event.target.value);
  };
  const addComment = (event) => {
    if (event.keyCode === 13 && event.target.value) {
      event.preventDefault();
      dispatch(createComment({ resId: props.shopId, data: { content: text } }));
    }
  };

  const deleteComment = (comment) => (event) => {};

  const commentBody = (item) => {
    return (
      <p className={classes.commentText}>
        {/* <Link>{item.postedBy.name}</Link><br/> */}
        {item.content}
        <span className={classes.commentDate}>
          {moment(item.create_time).format("MM DD YYYY - HH:mm")} |
          {auth.user_id === item.user_id && (
            <Icon
              onClick={deleteComment(item)}
              className={classes.commentDelete}
            >
              delete
            </Icon>
          )}
        </span>
      </p>
    );
  };

  return (
    <div>
      <CardHeader
        avatar={<Avatar className={classes.smallAvatar} src={DEFAULT_AVATAR} />}
        title={
          <TextField
            onKeyDown={addComment}
            multiline
            value={text}
            onChange={handleChange}
            placeholder="Write something ..."
            className={classes.commentField}
            margin="normal"
          />
        }
        className={classes.cardHeader}
      />
      {comments.map((item, i) => {
        return (
          <CardHeader
            avatar={
              <Avatar className={classes.smallAvatar} src={DEFAULT_AVATAR} />
            }
            title={commentBody(item)}
            className={classes.cardHeader}
            key={i}
          />
        );
      })}
    </div>
  );
}

Comments.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  updateComments: PropTypes.func.isRequired,
};
