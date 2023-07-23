import React, { useState , useEffect } from 'react'

// const URL ="www.thecocktaildb.com/api/json/v1/1/search.php?s=o";
const URL ="www.thecocktaildb.com/api/json/v1/1/search.php?f=a";

const Drink = () => {
    const [drinkdata,SetDrinkData] = useState([]);

    const fetchDrink = async(apiURL) => {
        const response = await fetch(apiURL);
        const {drink} = await response.json();
        console.log(drink);
        SetDrinkData(drink);
    };

    useEffect(()=> {
        fetchDrink(URL);
    },[]);

  return (
    <div>
        <form>
          <input type="text" className="search"  name='search' id='search' placeholder='search something new'/>
        </form>
        <hr/>
        <ul>
          {
            drinkdata.map((eachDrink)=>{
              const {idDink,strDrink,} = eachDrink;
              return <li>
                <div>
                  <img src="" alt="" />
                </div>
              </li>
            })
          }
        </ul>
    </div>
  );
};

export default Drink;