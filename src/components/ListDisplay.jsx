import React from "react";
import { useContext } from "react";
import { ListContext } from "../store/recipe-list-context";
import IngredientData from "./IngredientData.jsx";
import IngredientList from "./IngredientList.jsx";
import Header from './Header.jsx'

function ListDisplay () {
	const listCntx = useContext( ListContext );
	return (
		<>
			{listCntx.done ?
				<>
					<Header />
					<IngredientList />
				</>
				:
				<>
					<Header />
					<IngredientData />
					<IngredientList />
				</>
			}
			{listCntx.edited &&
				<>
					<IngredientList />
				</>
			}
		</>
	)
}

export default ListDisplay;
