const IngredientList = ({ ingredients, onAdjust }) => {
  return (
    <div>
      <h2>Recipe Ingredients</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name}: {ingredient.amount} {ingredient.unit}
            <button onClick={() => onAdjust(ingredient)}>Adjust</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientList;
