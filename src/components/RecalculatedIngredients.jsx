const RecalculatedIngredients = ( {recalculated, onReset} ) => {
	// const handleConvert = () => { };

	return (
		<div>
			<h2>Adjusted Recipe</h2>
			<ul>
				{recalculated.map((ingredient, index) => (
					<li key={index}>
						{ingredient.name}: {ingredient.amount} {ingredient.unit}
						{/* <button onClick={handleConvert}>Convert</button> */}
					</li>
				) )}
				<button className ="resetbtn" onClick={onReset}>Reset</button>
			</ul>
		</div>
	);
};

export default RecalculatedIngredients;
