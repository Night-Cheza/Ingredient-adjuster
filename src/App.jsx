import React, {useState} from "react";
import "./App.css"
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
	const [ isDone, setIsDone ] = useState( false );

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
      return {
        ...prevState,
        recipe: [...prevState.recipe, newData],
      };
    });
  }

  function doneHandler() {
    setHeaderText("Edit the ingredient to adjust the recipe to:");
    setIngredientEntry((prevState) => {
      return {
        ...prevState,
      };
		} );

		setIsDone( true );
  }

  return (
    <>
      <header>
        <h1>Re-calculate any recipe ingredients</h1>
      </header>
			<main>
				{!isDone ?
					<><IngredientData
						headerText={headerText}
						onAdd={addIngredientHandler}
						onDone={doneHandler}
					/>
						<IngredientList ingredientData={ingredientEntry.recipe} /></> :
					<IngredientList ingredientData={ingredientEntry.recipe} />
				}

        {/*displays updated ingredient */}
      </main>
    </>
  );
}
export default App;
