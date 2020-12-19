import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Suggestions from './../product/Suggestions'
import Search from './../product/Search'
import Categories from './../product/Categories'
import { useDispatch, useSelector } from 'react-redux'
import { getFoods } from '../../redux/foods'
import { getRestaurants } from '../../redux/restaurants'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  }
}))


export default function Home(){
  const classes = useStyles()
  const [suggestionTitle, setSuggestionTitle] = useState("Latest Products")
  const [suggestions, setSuggestions] = useState([])
  const dispatch = useDispatch();
  const categories = useSelector(s => s.categories);
  useEffect(() => {
    dispatch(getFoods());
    dispatch(getRestaurants());
  }, [])

    return (
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={8} sm={8}>
            <Search categories={categories}/>
            <Categories categories={categories}/>
          </Grid>
          <Grid item xs={4} sm={4}>
            <Suggestions products={suggestions} title={suggestionTitle}/>
          </Grid>
        </Grid>
      </div>
    )
}


