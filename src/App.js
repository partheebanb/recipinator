import { render } from '@testing-library/react';
import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe'
require('dotenv').config()
const request = require('request');

const App = () => {


  const [recipes, setRecipes] = useState([]);
  const apiKey = process.env.REACT_APP_APIKEY

  const options = {
    method: 'GET',
    url: 'https://rapidapi.p.rapidapi.com/recipes/searchComplex',
    qs: {
      offset: '0',
      number: '2',
      query: 'burger',
      cuisine: 'american',
      includeIngredients: 'onions, lettuce, tomato',
      excludeIngredients: 'coconut, mango',
      intolerances: 'peanut, shellfish',
      type: 'main course',
      ranking: '2',
      minCalories: '150',
      maxCalories: '1500',
      minFat: '5',
      maxFat: '100',
      minProtein: '5',
      maxProtein: '100',
      minCarbs: '5',
      maxCarbs: '100',
      minCholesterol: '0',
      maxCholesterol: '1000',

    },
    headers: {
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'x-rapidapi-key': apiKey,
      useQueryString: true
    }
  }

  useEffect(() => {
    getRecipes();
  }, [])

  const getRecipes = () => {
    return request(options, function (error, response, body) {
      if (error) throw new Error(error);
      // setRecipes(response.toJSON.results)
      const res = JSON.parse(body);
      setRecipes(res.results);
      console.log(res.results[0].title);
  })
}
  

  // const getRecipes = async() => {
  //   const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=3&apiKey=` + apiKey)
  //   const data = await response.json()
  //   setRecipes(data.results)
  // }


  return (
    <div className="App">
      Text and stuff
      <form className="search-form">
        <input className="search-bar" type="text"/>
        <button className="search-button" type="submit">Search</button>
      </form>
      {recipes.map(recipe => (
        <Recipe title={recipe.title} calories={recipe.calories} image={recipe.image}/>
      ))}

    </div>
  );
  
      }

export default App;