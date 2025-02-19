import { useState } from "react";
import RecipeForm from "./components/RecipeForm";
import IngredientList from "./components/IngredientList";
import RecalculatedIngredients from "./components/RecalculatedIngredients";
import { recalculateRecipe } from "./utils/conversionUtil";

function App() {
	const [ingredients, setIngredients] = useState([]);
	const [recalculated, setRecalculated] = useState([]);
	const [ isAdjusting, setIsAdjusting ] = useState( false );
	const [isRecalculated, setIsRecalculated] = useState(false);

	const addIngredient = (ingredient) => {
		setIngredients([...ingredients, { ...ingredient, amount: parseFloat(ingredient.amount) }]);
	};

	const handleRecalculation = (selectedIngredient, newAmount) => {
		const updatedRecipe = recalculateRecipe(ingredients, selectedIngredient, newAmount);
		setRecalculated(updatedRecipe);
		setIsRecalculated(true); // Hide adjustment mode after recalculating
	};

	const resetRecipe = () => {
		setIngredients([]);
		setRecalculated([]);
		setIsAdjusting(false);
		setIsRecalculated(false);
	};

	const handleCancel = () => {
		setIsRecalculated(false);
		setIsAdjusting(false)
	}

	return (
		<div>
			<h1>Recipe Ingredient Recalculator</h1>

			{/* Hide form if adjusting an ingredient */}
			{!isRecalculated && !isAdjusting && <RecipeForm onAddIngredient={addIngredient} />}

			{!isRecalculated && (
				<IngredientList
					ingredients={ingredients}
					isAdjusting={isAdjusting}
					onAdjust={() => setIsAdjusting( true )}
					onRecalculate={handleRecalculation}
					isRecalculated={isRecalculated}
					onCancel={handleCancel}
				/>
			)}

			{isRecalculated && <RecalculatedIngredients recalculated={recalculated} onReset={resetRecipe}/>}
		</div>
	);
}

export default App;
