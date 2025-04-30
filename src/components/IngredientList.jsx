import {useState} from "react";

import "./IngredientList.css"

const IngredientList = ({ ingredients, onAdjust, isAdjusting, onRecalculate, isRecalculated, onCancel }) => {
	const [ingredientToAdjust, setingredientToAdjust] = useState(null);
	const [newAmount, setNewAmount] = useState("");

	const handleAdjust = (ingredient) => {
		setingredientToAdjust(ingredient);
		onAdjust();
	};

	const handleCancel = () => {
		setingredientToAdjust(null);
		onAdjust();
		onCancel();
	};

	const handleRecalculate = () => {
		if (!newAmount || newAmount <= 0) return;
		onRecalculate(ingredientToAdjust, parseFloat(newAmount));
		setingredientToAdjust(null);
	};

	return (
		<div>
			{/*conditionally displaying header*/}
			{ingredients.length > 0 && <h2>Recipe Ingredients</h2>}

			<ul className="list">
				{ingredients.map((ingredient, index) => (
					<li key={index}>
						{ingredient.name}: {ingredient.amount} {ingredient.unit}
						<button className="adjust">Delete</button>
						{ingredients.length > 1 && !ingredientToAdjust && !isRecalculated && (
							<button className="adjust" onClick={() => handleAdjust( ingredient )}>Adjust</button>
						)}
					</li>
				))}
			</ul>

			{/*conditionally displaying form*/}
			{isAdjusting && ingredientToAdjust && (
				<>
					<h3>New {ingredientToAdjust.name} amount</h3>
					<div className="newValue">
						<input
							type="number"
							placeholder={`New value for ${ingredientToAdjust.name}`}
							value={newAmount}
							onChange={(e) => setNewAmount(e.target.value)}
						/>
						<button className="btn" onClick={handleRecalculate}>Recalculate</button>
						<button className="btn" onClick={handleCancel}>Cancel</button>
					</div>
				</>
			)}
		</div>
	);
};

export default IngredientList;
