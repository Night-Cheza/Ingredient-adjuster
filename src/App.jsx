import React from "react";
import "./App.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import ListDisplay from "./components/ListDisplay.jsx";
import ListContextProvider from './store/recipe-list-context.jsx';

function App() {
	return (
		<ListContextProvider>
			<header>
				<h1>Re-calculate recipe ingredients</h1>
			</header>
			<main>
				<ListDisplay />
			</main>
		</ListContextProvider>
	);
}
export default App;
