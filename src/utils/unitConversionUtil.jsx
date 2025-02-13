export const unitConversions = {
  "Cup (250ml)": { "Tbsp": 16, "ml": 250 },
  "Tbsp": { "tsp": 3, "g": 15, "ml": 15 },
  "tsp": { "ml": 5, "g": 5 },
  "oz": { "g": 28.35, "ml": 29.57 },
  "L": { "ml": 1000 },
  "kg": { "g": 1000 },
  "lb": { "g": 453.6 },
};

/**
 * Convert ingredient amount to a different unit.
 */
export const convertUnit = (amount, fromUnit, toUnit) => {
  if (!unitConversions[fromUnit] || !unitConversions[fromUnit][toUnit]) return amount;
  return amount * unitConversions[fromUnit][toUnit];
};
