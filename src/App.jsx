import { useState } from "react";
import RecipeForm from "./components/RecipeForm";
import IngredientList from "./components/IngredientList";
import RecalculatedIngredients from "./components/RecalculatedIngredients";
import {recalculateRecipe} from "./utils/recalculateRecipeUtil";
import {convertMeasurements} from "./utils/unitConversionUtil";

function App() {
	const [ingredients, setIngredients] = useState([]);
	const [ recalculated, setRecalculated ] = useState( [] );
	const [ isDisplaying, setIsDisplaying ] = useState( {adjusting: false, recalculated: false} );
	const [ isDuplicate, setDublicate ] = useState( false );
	const [ isConverted, setIsConverted ] = useState( false );
	const [ convertedRecipe, setConvertedRecipe ] = useState( [] );

	const addIngredient = ( ingredient ) => {
		// Check for Duplicates
		const isDuplicate = ingredients.some(item => item.name.toLowerCase() === ingredient.name.toLowerCase());
		if( isDuplicate ){
			setDublicate( true );
			return;
		}
		setIngredients( [ ...ingredients, {...ingredient, amount: parseFloat( ingredient.amount )} ] );
		setDublicate( false );
	};

	const handleRecalculation = (selectedIngredient, newAmount) => {
		const updatedRecipe = recalculateRecipe( ingredients, selectedIngredient, newAmount );
		setRecalculated(updatedRecipe);
		setIsDisplaying({...isDisplaying, recalculated: true}); // Hide adjustment mode after recalculating
	};

	const handleConvertRecipe = () => {
		recalculated.forEach( ( {name, amount, unit} ) => {
			const converted = convertMeasurements( name, amount, unit );
			setConvertedRecipe(prev =>  [...prev, converted] )
	} )
		setIsConverted( true );
	}

	const resetRecipe = () => {
		setIngredients([]);
		setRecalculated( [] );
		setConvertedRecipe( [] );
		setIsDisplaying( {adjusting: false, recalculated: false} );
		setIsConverted( false );
	};

	const handleCancel = () => {
		setIsDisplaying({adjusting: false, recalculated: false});
	}

	return (
		<div>
			<h1>Recipe Ingredient Recalculator</h1>

			{/* Hide form if adjusting an ingredient */}
			{!isDisplaying.recalculated && !isDisplaying.adjusting && <RecipeForm onAddIngredient={addIngredient} duplicate={isDuplicate}/>}

			{!isDisplaying.recalculated && (
				<IngredientList
					ingredients={ingredients}
					isAdjusting={isDisplaying.adjusting}
					onAdjust={() => setIsDisplaying({...isDisplaying, adjusting: true})}
					onRecalculate={handleRecalculation}
					isRecalculated={isDisplaying.recalculated}
					onCancel={handleCancel}
				/>
			)}

			{isDisplaying.recalculated && <RecalculatedIngredients recalculated={recalculated} onReset={resetRecipe} convertedRecipe={convertedRecipe} onConvert={handleConvertRecipe} isConverted={isConverted}/>}
		</div>
	);
}

export default App;
