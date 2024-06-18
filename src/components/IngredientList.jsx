import React from "react";

function IngredientList({ingredientData, onEdit}) {
  return (
		<section>
      <li>
        {ingredientData.map((ingredient) => (
          <ul key={ingredient.ingredient}>
            <span>{ingredient.ingredient}</span>
            <span>{ingredient.amount}</span>
						<span>{ingredient.measurement}</span>
						<span><i className="bi bi-pencil-square" onClick={onEdit}></i></span>
          </ul>
        ))}
      </li>
    </section>
  );
}

export default IngredientList;
