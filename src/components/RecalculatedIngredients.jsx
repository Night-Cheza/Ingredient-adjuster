const RecalculatedIngredients = ({ recalculated }) => {
  return (
    <div>
      <h2>Adjusted Recipe</h2>
      <ul>
        {recalculated.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name}: {ingredient.amount.toFixed(2)} {ingredient.unit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecalculatedIngredients;
