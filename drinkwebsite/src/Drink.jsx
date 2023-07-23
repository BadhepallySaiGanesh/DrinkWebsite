// import React, { useState , useEffect } from 'react'

// // const URL ="www.thecocktaildb.com/api/json/v1/1/search.php?s=o";
// const URL ="www.thecocktaildb.com/api/json/v1/1/search.php?f=a";

// const Drink = () => {
//     const [drinkdata,SetDrinkData] = useState([]);

//     const fetchDrink = async(apiURL) => {
//         const response = await fetch(apiURL);
//         const {drink} = await response.json();
//         console.log(drink);
//         SetDrinkData(drink);
//     };

//     useEffect(()=> {
//         fetchDrink(URL);
//     },[]);

//   return (
//     <div>
//         <form>
//           <input type="text" className="search"  name='search' id='search' placeholder='search something new'/>
//         </form>
//         <hr/>
//         <ul>
//           {
//             drinkdata.map((eachDrink)=>{
//               const {idDink,strDrink,} = eachDrink;
//               return <li>
//                 <div>
//                   <img src="" alt="" />
//                 </div>
//               </li>
//             })
//           }
//         </ul>
//     </div>
//   );
// };

// export default Drink;


import React, { useState, useEffect } from "react";

const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const Final = () => {
  const [drinksData, setDrinksData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({ status: false, msg: "" });

  const fetchDrink = async (apiURL) => {
    setLoading(true);
    setIsError({ status: false, msg: "" });
    try {
      const response = await fetch(apiURL);
      const { drinks } = await response.json();
      setDrinksData(drinks);
      setLoading(false);
      setIsError({ status: false, msg: "" });
      if (!drinks) {
        throw new Error("Data Not Found Because U searched Worng");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setIsError({
        status: true,
        msg: error.message || "something went wrong...",
      });
    }
  };

  useEffect(() => {
    const correctURL = `${URL}${searchTerm}`;
    fetchDrink(correctURL);
  }, [searchTerm]);

  return (
    <div>
   <div>
   <h1 className="compname">SoftDrink</h1>
   </div>
      <form className="searchbar">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="search Drinks"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <hr className="hr" / >
      <hr className="hr" / >
      {loading && !isError?.status && <h3>Loading...</h3>}
      {isError?.status && <h2 style={{ color: "red",textAlign:"center"}}>{isError.msg}</h2>}
      {!loading && !isError?.status && (
        <ul className="cocktaildata">
          {drinksData.map((eachDrink) => {
            const { idDrink, strDrink, strDrinkThumb,strCategory,strAlcoholic, } = eachDrink;
            return (
              <li key={idDrink}>
                <div>
                  <img src={strDrinkThumb} alt={strDrink} />
                </div>
                <div className="text">
                  <h3>DrinkName:{strDrink}</h3>
                  <h3>Category:{strCategory}</h3>
                <span>{strAlcoholic} </span>
                </div>
                <hr/>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Final;