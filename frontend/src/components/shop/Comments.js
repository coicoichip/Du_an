import React, {useState} from 'react'
import CardHeader from '@material-ui/core/CardHeader'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import Icon from '@material-ui/core/Icon'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {Link} from 'react-router-dom'
import { DEFAULT_AVATAR } from '../../config'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  smallAvatar: {
    width: 25,
    height: 25
  },
  commentField: {
    width: '96%'
  },
  commentText: {
    backgroundColor: 'white',
    padding: theme.spacing(1),
    margin: `2px ${theme.spacing(2)}px 2px 2px`
  },
  commentDate: {
    display: 'block',
    color: 'gray',
    fontSize: '0.8em'
 },
 commentDelete: {
   fontSize: '1.6em',
   verticalAlign: 'middle',
   cursor: 'pointer'
 }
}))

export default function Comments (props) {
  const classes = useStyles()
  const [text, setText] = useState('')
  const auth = useSelector(s => s.auth)
  const handleChange = event => {
    setText(event.target.value)
  }
  const addComment = (event) => {
    if(event.keyCode == 13 && event.target.value){
      event.preventDefault()
      // comment({
      //   userId: jwt.user._id
      // }, {
      //   t: jwt.token
      // }, props.postId, {text: text}).then((data) => {
      //   if (data.error) {
      //     console.log(data.error)
      //   } else {
      //     setText('')
      //     props.updateComments(data.comments)
      //   }
      // })
    }
  }

  const deleteComment = comment => event => {
    // uncomment({
    //   userId: jwt.user._id
    // }, {
    //   t: jwt.token
    // }, props.postId, comment).then((data) => {
    //   if (data.error) {
    //     console.log(data.error)
    //   } else {
    //     props.updateComments(data.comments)
    //   }
    // })
  }

    const commentBody = item => {
      return (
        <p className={classes.commentText}>
          <Link to={"/user/" + item.postedBy._id}>{item.postedBy.name}</Link><br/>
          {item.text}
          <span className={classes.commentDate}>
            {(new Date(item.created)).toDateString()} |
            {auth.email === item.postedBy._id &&
              <Icon onClick={deleteComment(item)} className={classes.commentDelete}>delete</Icon> }
          </span>
        </p>
      )
    }

    return (<div>
        <CardHeader
              avatar={
                <Avatar className={classes.smallAvatar} src={DEFAULT_AVATAR}/>
              }
              title={ <TextField
                onKeyDown={addComment}
                multiline
                value={text}
                onChange={handleChange}
                placeholder="Write something ..."
                className={classes.commentField}
                margin="normal"
                />}
              className={classes.cardHeader}
        />
        { props.comments.map((item, i) => {
            return <CardHeader
                      avatar={
                        <Avatar className={classes.smallAvatar} src={DEFAULT_AVATAR}/>
                      }
                      title={commentBody(item)}
                      className={classes.cardHeader}
                      key={i}/>
              })
        }
    </div>)
}

Comments.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  updateComments: PropTypes.func.isRequired
}
