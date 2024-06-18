import React from "react";

function IngredientList({ ingredientData }) {
  return (
    <section>
      <li>
        {ingredientData.map((ingredient) => (
          <ul key={ingredient.ingredient}>
            <span>{ingredient.ingredient}</span>
            <span>{ingredient.amount}</span>
            <span>{ingredient.measurement}</span>
          </ul>
        ))}
      </li>
    </section>
  );
}

export default IngredientList;
