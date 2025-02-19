import { useState } from "react";

const IngredientList = ({ ingredients, onAdjust, onRecalculate, isAdjusting, isRecalculated }) => {
  const [adjustedIngredient, setAdjustedIngredient] = useState(null);
  const [newAmount, setNewAmount] = useState("");

  const handleAdjust = (ingredient) => {
    setAdjustedIngredient(ingredient);
    onAdjust();
  };

  const handleRecalculate = () => {
    if (!newAmount || newAmount <= 0) return;
    onRecalculate(adjustedIngredient, parseFloat(newAmount));
    setAdjustedIngredient(null);
  };

  return (
		<div>
			{/*conditionally displaying header*/}
      {ingredients.length > 0 && <h2>Recipe Ingredients</h2>}

      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name}: {ingredient.amount} {ingredient.unit}
            {ingredients.length > 1 && !adjustedIngredient && !isRecalculated && (
              <button onClick={() => handleAdjust(ingredient)}>Adjust</button>
            )}
          </li>
        ))}
      </ul>

			{/*conditionally displaying form*/}
      {isAdjusting && adjustedIngredient && (
        <div>
          <h3>Adjust {adjustedIngredient.name}</h3>
          <input
            type="number"
            placeholder={`New value for ${adjustedIngredient.name}`}
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
          />
          <button onClick={handleRecalculate}>Recalculate</button>
        </div>
      )}
    </div>
  );
};

export default IngredientList;
