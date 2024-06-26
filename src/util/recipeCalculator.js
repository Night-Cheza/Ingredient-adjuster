//the function gets array of objects
//each object has to have following parameters:
//-iniAmount: initial amout of an ingredient that was adjusted by user
//-newAmount: new adjusted by user value for the ingredient to adjust other ingredients to
//-adjustingAmount: amount for each of the rest of ingredients to adjust

export function recalculateRecipe (iniAmount, newAmount, amount) {
	let oldAmount = iniAmount;
	let updatedAmount = newAmount;
	let adjustingAmount = amount;

	const difference = updatedAmount * 100 / oldAmount;
	const calculatedAmount = difference * adjustingAmount / 100;
	return calculatedAmount.toFixed(2);
}
