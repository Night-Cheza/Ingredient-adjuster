import { useState } from "react";

const IngredientList = ({ ingredients, onAdjust }) => {
  const [adjustedIngredient, setAdjustedIngredient] = useState(null);
  const [newAmount, setNewAmount] = useState("");

  const handleAdjust = (ingredient) => {
    if (!newAmount || newAmount <= 0) return;
    onAdjust(ingredient, parseFloat(newAmount));
    setNewAmount("");
  };

  return (
    <div>
      <h2>Recipe Ingredients</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name}: {ingredient.amount} {ingredient.unit}
            <button onClick={() => setAdjustedIngredient(ingredient)}>Adjust</button>
          </li>
        ))}
      </ul>

      {adjustedIngredient && (
        <div>
          <h3>Adjust {adjustedIngredient.name}</h3>
          <input
            type="number"
            placeholder={`New value for ${adjustedIngredient.name}`}
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
          />
          <button onClick={() => handleAdjust(adjustedIngredient)}>Recalculate</button>
        </div>
      )}
    </div>
  );
};

export default IngredientList;

