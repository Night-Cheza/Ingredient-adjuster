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
		"Enter all ingredients called for a recipe:"
	);
	const [ isDone, setIsDone ] = useState( false );
	const [ isEdited, setIsEdited ] = useState( false );

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
		setIngredientEntry((prevState) => {
			return {
				...prevState,
			};
		} );

		setIsDone( true );
		setHeaderText("Edit the ingredient to adjust the recipe to:");
	}

	function editHandler ( ingredient ) {
		setIngredientEntry((prevState) => {
			const newData = {
				...ingredient,
			};
			return {
				...prevState,
				recipe: [...prevState.recipe, newData],
			};
		} );

		setIsEdited( true );
		setHeaderText( 'Here is your recalculated recipe:' );
	}

  return (
		<>
			<header>
				<h1>Re-calculate recipe ingredients</h1>
			</header>
			<main>
				{!isDone ?
					<>
						<IngredientData
							headerText={headerText}
							onAdd={addIngredientHandler}
							onDone={doneHandler}
						/>
						<IngredientList ingredientData={ingredientEntry.recipe} done={isDone} />
					</> :
					<>
						<h3>{headerText}</h3>
						<IngredientList ingredientData={ingredientEntry.recipe} onEdit={editHandler} done={isDone} />
					</>
				}
				{isEdited ?
					<>
						<IngredientList ingredientData={ingredientEntry.recipe} edited={isEdited} />
					</> : undefined
				}
      </main>
    </>
  );
}
export default App;
