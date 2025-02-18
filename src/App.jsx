import { useState } from "react";
import RecipeForm from "./components/RecipeForm";
import IngredientList from "./components/IngredientList";
import RecalculatedIngredients from "./components/RecalculatedIngredients";
import { recalculateRecipe } from "./utils/conversionUtils";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [recalculated, setRecalculated] = useState([]);
  const [isAdjusting, setIsAdjusting] = useState(false);

  const addIngredient = (ingredient) => {
    setIngredients([...ingredients, { ...ingredient, amount: parseFloat(ingredient.amount) }]);
  };

  const handleRecalculation = (selectedIngredient, newAmount) => {
    const updatedRecipe = recalculateRecipe(ingredients, selectedIngredient, newAmount);
    setRecalculated(updatedRecipe);
    setIsAdjusting(false); // Hide adjustment mode after recalculating
  };

  return (
    <div>
      <h1>Recipe Ingredient Recalculator</h1>

      {/* Hide form if adjusting an ingredient */}
      {!isAdjusting && <RecipeForm onAddIngredient={addIngredient} />}

      <IngredientList
				ingredients={ingredients}
				isAdjusting={isAdjusting}
        onAdjust={setIsAdjusting(true)}
        onRecalculate={handleRecalculation}
      />

      {recalculated.length > 0 && <RecalculatedIngredients recalculated={recalculated} />}
    </div>
  );
}

export default App;
