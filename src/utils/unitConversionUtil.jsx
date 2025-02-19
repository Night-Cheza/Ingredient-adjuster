export const unitConversions = {
  "Cup (250ml)": { "Tbsp": 16, "ml": 250 },
  "Tablespoon (tbsp)": { "tsp": 3, "g": 14.18, "ml": 15, "oz": 0.5 },
  "Teaspoon (tsp)": { "g": 5.69, "ml": 5 },
  "Ounce (oz)": { "g": 28.35, "ml": 29.57 },
  "Liter (L)": { "ml": 1000 },
  "Kilogram (kg)": { "g": 1000 },
  "Pound (lb)": { "g": 453.6 },
};

/**
 * Convert ingredient amount to a different unit.
 */
export const convertUnit = (amount, fromUnit, toUnit) => {
  if (!unitConversions[fromUnit] || !unitConversions[fromUnit][toUnit]) return amount;
  return amount * unitConversions[fromUnit][toUnit];
};
