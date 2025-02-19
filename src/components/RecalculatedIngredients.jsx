const RecalculatedIngredients = ({ recalculated }) => {
  return (
    <div>
      <h2>Adjusted Recipe</h2>
      <ul>
        {recalculated.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name}: {ingredient.amount} {ingredient.unit}
            {ingredient.convertedValues.length > 0 && (
              <>
                {" and "}
                <span>{ingredient.convertedValues[0].amount} {ingredient.convertedValues[0].unit}</span>
                {ingredient.convertedValues.length > 1 && (
                  <>
                    {" ("}
                    {ingredient.convertedValues.slice(1).map((conv, idx) => (
                      <span key={idx}>
                        {conv.amount} {conv.unit}
                        {idx < ingredient.convertedValues.length - 2 ? " or " : ""}
                      </span>
                    ))}
                    {")"}
                  </>
                )}
              </>
            )}
          </li>
				) )}
			</ul>
			<></>
    </div>
  );
};

export default RecalculatedIngredients;
