import React from "react";
import { useContext } from "react";
import { ListContext } from "../store/recipe-list-context";

function Header () {
	const listCntx = useContext( ListContext );
	return (
		<>
			{listCntx.done && listCntx.edited ? <h3>Your re-calculated recipe is:</h3> :
				<>{listCntx.done && !listCntx.edited ? <h3>Edit the ingredient to adjust the recipe to</h3> : <h3>Enter all ingredients called for a recipe</h3>}</>}
		</>
	)
}

export default Header;
