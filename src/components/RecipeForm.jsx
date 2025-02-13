import { useState } from "react";

const RecipeForm = ({ onAddIngredient, onRecalculate }) => {
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
        <input
          type="text"
          placeholder="Ingredient Name"
          value={ingredient.name}
          onChange={(e) => setIngredient({ ...ingredient, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={ingredient.amount}
          onChange={(e) => setIngredient({ ...ingredient, amount: e.target.value })}
        />
        <select
          value={ingredient.unit}
          onChange={(e) => setIngredient({ ...ingredient, unit: e.target.value })}
        >
          <option value="">Select Unit</option>
          <option value="Cup (250ml)">cup</option>
          <option value="Tablespoon (tbsp)">tbsp</option>
          <option value="Teaspoon (tsp)">tsp</option>
          <option value="Ounce (oz)">oz</option>
					<option value="Liter (L)">L</option>
					<option value="Milliliters (ml)">ml</option>
					<option value="Kilogram (kg)">kg</option>
					<option value="Gram (g)">g</option>
					<option value="Pound (lb)">lb</option>
					<option value="Piece">piece</option>
        </select>
        <button type="submit">Add Ingredient</button>
      </form>

      <h3>Recalculate Ingredients</h3>
      <button onClick={onRecalculate}>Recalculate</button>
    </div>
  );
};

export default RecipeForm;
