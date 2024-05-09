import React from "react";
import "./ingredientsInput.css"


function IngredientsInput () {

    return (
        <div>
            <form>
                <table>
                    <thead>Recipe</thead>
                    <tr>
                        <label>Ingredient for the recipe:</label>
                        <td><input type="text" placeholder="Enter the ingredient"></input></td>
                    </tr>
                    <tr>
                        <label>Amount called in the recipe:</label>
                        <td><input type="text" placeholder="Enter the amount"></input></td>
                        <td>
                            <select className="measurement">
                                <option value={'grams'}>Grams</option>
                                <option value={'mls'}>Milliliters</option>
                                <option value={'tsp'}>Tea spoon</option>
                                <option value={'tbsp'}>Table spoon</option>
                                <option value={'cups'}>Cups</option>                                
                            </select>
                        </td>
                    </tr>
                </table>
            </form>
            {/* <Form>
                <Form.Group>
                    <Form.Label>Enter ingredients required for the recipe:</Form.Label>
                    <Form.Control type="text" placeholder="Enter the ingredient"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Enter the amount called in the recipe:</Form.Label>
                    <Form.Control type="text" placeholder="Enter the amount"></Form.Control>
                    <Dropdown data-bs-theme="dark">
                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">measurement</Dropdown.Toggle>
                        <Dropdown.Menu>
                        <Dropdown.Item active>Cups</Dropdown.Item>
                        <Dropdown.Item>Table spoon</Dropdown.Item>
                        <Dropdown.Item>Tea spoon</Dropdown.Item>
                        <Dropdown.Item>Grams</Dropdown.Item>
                        <Dropdown.Item>Milliliters</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form> */}
        </div>
    );
}

export default IngredientsInput;