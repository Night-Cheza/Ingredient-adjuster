import { useState } from "react";

const RecipeForm = ({ onAddIngredient }) => {
  const [ingredient, setIngredient] = useState({ name: "", amount: "", unit: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ingredient.name || !ingredient.amount || !ingredient.unit) return;
    onAddIngredient(ingredient);
    setIngredient({ name: "", amount: "", unit: "" });
  };

  return (
    <div>
      <h2>Add Ingredients</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Ingredient Name" value={ingredient.name} onChange={(e) => setIngredient({ ...ingredient, name: e.target.value })} />
        <input type="number" placeholder="Amount" value={ingredient.amount} onChange={(e) => setIngredient({ ...ingredient, amount: e.target.value })} />
        <select value={ingredient.unit} onChange={(e) => setIngredient({ ...ingredient, unit: e.target.value })}>
          <option value="">Select Measurement</option>
					{
						[ "Cup (250ml)","Tablespoon (tbsp)", "Teaspoon (tsp)", "Ounce (oz)", "Liter (L)", "Milliliters (ml)", "Kilogram (kg)", "Gram (g)", "Pound (lb)", "Piece" ].map( ( unit ) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
        <button type="submit">Add Ingredient</button>
      </form>
    </div>
  );
};

export default RecipeForm;
