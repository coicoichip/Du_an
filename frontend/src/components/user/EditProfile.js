import React, {useState, useEffect} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { makeStyles } from '@material-ui/core/styles'
import {Redirect, useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editProfile } from '../../redux/auth'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  subheading: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  }
}))

export default function EditProfile({ match }) {
  const classes = useStyles()
  const [values, setValues] = useState({
      name: '',
      email: '',
      password: '',
      seller: false,
      redirectToProfile: false,
      error: ''
  })
  const auth = useSelector(s => s.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      phone: values.phone || undefined,
      address: values.address || undefined,
    }
    dispatch(editProfile({data: user, history}))
  }
  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value})
  }
  useEffect(() => {
    setValues({
      ...values,
      name: auth.name ,
      email: auth.email ,
      password: "***" ,
      phone: auth.phone ,
      address: auth.address ,
    })
  })
  if (values.redirectToProfile) {
    return (<Redirect to={'/user/' + values.userId}/>)
  }
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Edit Profile
          </Typography>
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
          />
          <br />
          <TextField
            id="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
          />
          <br />
          <TextField
            id="phone"
            label="Phone"
            className={classes.textField}
            value={values.phone}
            onChange={handleChange("phone")}
            margin="normal"
          />
          <br />
          <TextField
            id="address"
            label="Address"
            className={classes.textField}
            value={values.address}
            onChange={handleChange("address")}
            margin="normal"
          />
          <TextField
            id="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
          />
          <br /> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
    )
}
