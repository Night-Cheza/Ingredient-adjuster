import React, { forwardRef } from "react";

const OPTIONS = [
  "Please select",
  "Cup (250ml)",
  "Tablespoon (tbsp)",
  "Teaspoon (tsp)",
  "Ounce (oz)",
  "Liter (L)",
  "Milliliters (ml)",
  "Kilogram (kg)",
  "Gram (g)",
  "Pound (lb)",
  "Piece",
];

const IngredientInput = forwardRef(function IngredientInput(
  { label, select, ...props },
  ref
) {
  return (
    <>
			<tr>
				<td>
					<label>{label}</label>
				</td>
				<td>
					{select ? (
						<select ref={ref} {...props}>
							{OPTIONS.map((value, valueIndex) => (
								<option key={valueIndex} value={value}>
									{value}
								</option>
							))}
						</select>
					) : (
						<input ref={ref} {...props} />
					)}
				</td>
			</tr>

    </>
  );
});

export default IngredientInput;
