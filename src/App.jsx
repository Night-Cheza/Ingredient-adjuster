//ts no-check
import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import IngredientData from "./components/IngredientData.jsx";
import IngredientList from "./components/IngredientList.jsx";

function App() {
  const [ingredientEntry, setIngredientEntry] = useState({
    recipe: [],
  });
  const [headerText, setHeaderText] = useState(
    "Please enter all ingredients called for a recipe:"
  );
  const [buttonText, setButtonText] = useState("Add Ingredient");
  const [adjusted, setAdjusted] = useState(false);
  let newRecipe = [];

  function addIngredientHandler (ingredientData) {
    ingredientEntry.recipe.forEach((entry) => {
      if(entry.ingredient === ingredientData.ingredient)
      {
        console.log('You already have this ingredient');
        throw Error('You already have this ingredient');
      }
    });
    setIngredientEntry((prevState) => {
      const newData = {
        ...ingredientData,
      };
      // console.log(newData);
      return {
        ...prevState,
        recipe: [...prevState.recipe, newData],
      };
    });
  }

  function doneHandler() {
    setHeaderText("Enter the ingredient to adjust the recipe to:");
    setButtonText("Adjust Recipe");
    setIngredientEntry((prevState) => {
      return {
        ...prevState,
      };
    });
  }

  function adjustHandler (adjustData) {
    const index = ingredientEntry.recipe.findIndex(
      (data) => data.ingredient === adjustData.ingredient
    );
    if(index === undefined || index === -1)
    {
      //HANDLE ERROR MESSAGE WHEN ADJUSTING INGREDIENT THAT IS NOT IN THE LIST
      return;
    }
    const recipe = [...ingredientEntry.recipe];
    const oldEntry = recipe[index]; //to save previous data
    //calculate adjustment for all ingredients in the recipe
    recipe.forEach((entry) => {
      if(entry.ingredient !== adjustData.ingredient)
      {
        const difference = (adjustData.amount * 100) / oldEntry.amount;
        const newAmount = difference * entry.amount / 100;
        newRecipe = [...newRecipe, {...entry, amount: newAmount}]
      } else
      {
        newRecipe = [...newRecipe, {...entry, amount: +adjustData.amount}]
      }
      return newRecipe;
      // const newEntry = { ingredient: entry.ingredient, amount: newAmount, measurement: entry.measurement };
      // result.push(newEntry);
      // return result;
    });

    // console.log(result)
    setIngredientEntry(newRecipe);

    // setIngredientEntry(prevState => ({...prevState, ...result}))
    // console.log(result);
    setAdjusted(true);
    // setIngredientEntry((result) => {
    //   // console.log(newData);
    //   return {
    //     ...result, adjustData
    //   };
    // });
    // console.log(newRecipe)
  }

  return (
    <>
      <header>
        <h1>Re-calculate any recipe ingredients</h1>
      </header>
      <main>
        <IngredientData
          headerText={headerText}
          onAdd={addIngredientHandler}
          onDone={doneHandler}
          btnText={buttonText}
          onAdjust={adjustHandler}
        />
        { adjusted
          ? <IngredientList ingredientData={ newRecipe } />
          : <IngredientList ingredientData={ ingredientEntry.recipe } />
        }

        {/*displays updated ingredient */}
      </main>
    </>
  );
}
export default App;

//when updating state based on previous state, have to pass a function.
//Function gets current state and then updates it
//example: const [isOpen, setIsOpen] = useState(false);
//function clickHandler() {
//  setIsOpen(() => !isOpen); -schedules state update which happens in a second
//}

// Example reading input with refs:

// import React from 'react';
// import Input from './Input';

// export const userData = {
//   name: '',
//   email: '',
// };

// export function App() {
//     const nameInput = React.useRef();
//     const emailInput = React.useRef();

//   function handleSaveData() {
//     userData.name = nameInput.current.value;
//     userData.email = emailInput.current.value;

//     console.log(userData);
//   }

//   return (
//     <div id="app">
//       <Input ref={nameInput} type="text" label="Your Name" />
//       <Input ref={emailInput} type="email" label="Your E-Mail" />
//       <p id="actions">
//         <button onClick={handleSaveData}>Save Data</button>
//       </p>
//     </div>
//   );
// }

// import React from 'react';

// const Input = React.forwardRef(function Input({label, type}, ref) {
//   return (
//     <p className="control">
//       <label>{label}</label>
//       <input ref={ref} type={type}/>
//     </p>
//   );
// });

// export default Input;
