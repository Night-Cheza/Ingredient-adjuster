import {createContext} from "react";

export const ListContext = createContext({
	recipe: [],
	addIngredient: () => { },
	doneAdding: () => { },
	editIngredient: () => { },
});

export default function ListContextProvider() {}
