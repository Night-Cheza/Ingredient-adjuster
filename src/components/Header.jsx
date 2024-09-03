import React from "react";

function Header ({done, edited}) {
	return (
		<>
			{done && edited ? <h3>Your re-calculated recipe is:</h3> :
				<>{done && !edited ? <h3>Edit the ingredient to adjust the recipe to</h3> : <h3>Enter all ingredients called for a recipe</h3>}</>}
		</>


	)
}

export default Header;
