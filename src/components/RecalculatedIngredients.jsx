

const RecalculatedIngredients = ( {recalculated, onReset, convertedRecipe, onConvert, isConverted} ) => {
	return (
		<div>
			{!isConverted ?
				<>
					<h2>Adjusted Recipe</h2>
					<ul>
						{recalculated.map((ingredient, index) => (
							<li key={index}>
								{ingredient.name}: {ingredient.amount} {ingredient.unit}
							</li>
						) )}
						<button onClick={onConvert}>Convert</button>
						<button onClick={onReset}>Reset</button>
					</ul>
				</>
				:
				<>
					<h2>Converted recipe Recipe</h2>
					<ul>
						{convertedRecipe.map((ingredient, index) => (
							<li key={index}>
								{ingredient.name}: {ingredient.amount} {ingredient.unit}
							</li>
						) )}
						<button onClick={onReset}>Reset</button>
					</ul>
				</>
			}

		</div>
	);
};

export default RecalculatedIngredients;
