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
    <section>
      <label>{label}</label>
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
    </section>
  );
});

export default IngredientInput;
