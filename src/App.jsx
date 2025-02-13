import { useState } from "react";
import RecipeForm from "./components/RecipeForm";
import IngredientList from "./components/IngredientList";
import RecalculatedIngredients from "./components/RecalculatedIngredients";
import { recalculateRecipe } from "./utils/conversionUtils";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [recalculated, setRecalculated] = useState([]);

  const addIngredient = (ingredient) => {
    setIngredients([...ingredients, { ...ingredient, amount: parseFloat(ingredient.amount) }]);
  };

  const handleRecalculation = () => {
    setRecalculated(recalculateRecipe(ingredients));
  };

  return (
    <div>
      <h1>Recipe Ingredient Recalculator</h1>
      <RecipeForm onAddIngredient={addIngredient} onRecalculate={handleRecalculation} />
      <IngredientList ingredients={ingredients} onAdjust={handleRecalculation} />
      {recalculated.length > 0 && <RecalculatedIngredients recalculated={recalculated} />}
    </div>
  );
}

export default App;
