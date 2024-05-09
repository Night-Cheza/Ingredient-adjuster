import React from "react";
import "./ingredientsInput.css"
import { BsTrash } from "react-icons/bs"

function IngredientsInput () {    

    const ingridientChangeHandler = () => {

    };

    const amountChangeHandler = () => {

    };

    const addFieldsHandler = (e) => {
        //to prevent page reload on submit event
        e.preventDefault();
    };

    const submitFormHandler = (e) => {
        //to prevent page reload on submit event
        e.preventDefault();
    }

    const selectChangeHandler = () => {

    }

    return (
        <div>
            <form onSubmit={submitFormHandler}>
                <label>Recipe</label>
                <table>
                    <thead>
                        <tr>
                            <th>Ingredient for the recipe:</th>
                            <th>Amount called for the recipe:</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                                <td>
                                    <input type="text" placeholder="Enter the ingredient" onChange={ingridientChangeHandler} className="ingridients"></input>
                                </td>
                                <td>
                                    <input type="text" placeholder="Enter the amount" onChange={amountChangeHandler} className="amount"></input>
                                </td>
                                <td>
                                    <select className="measurement" onSelect={selectChangeHandler}>
                                        <option value={'default'}>measurement</option>
                                        <option value={'grams'}>Grams</option>
                                        <option value={'mls'}>Milliliters</option>
                                        <option value={'tsp'}>Tea spoon</option>
                                        <option value={'tbsp'}>Table spoon</option>
                                        <option value={'cups'}>Cups</option>
                                    </select>
                                </td>
                                <td><span><BsTrash /></span></td>
                            </tr>
                        <tr><button className="addFields" onClick={addFieldsHandler}>Add Row</button></tr>
                    </tbody>
                </table>
                <button type="submit" className="submitRecipe">Submit</button>
            </form>
        </div>
    );
}

export default IngredientsInput;

