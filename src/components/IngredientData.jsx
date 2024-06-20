import React, { useRef } from "react";
import IngredientInput from "./IngredientInput.jsx";
import Button from "./Button.jsx";

function IngredientData ({onAdd, onDone, headerText}) {
  const ingredientData = useRef();
  const amount = useRef();
  const measurement = useRef("Please select");

  function submitHandler () {
    const ingredientInput = ingredientData.current.value.trim().toLowerCase();
    const amountInput = amount.current.value.trim();
    const measurementInput = measurement.current.value;

    if (
      ingredientInput.trim() === "" ||
      amountInput.trim() === "" ||
      measurementInput.trim() === "Please select"
    )
    {
      //HANDLE ERROR MESSAGE FOR EMPTY INPUT
      return;

    } else if(isNaN(amountInput) || amountInput < 0)
    {
      throw Error('Please provide correct amount')
    }

    onAdd({
      ingredient: ingredientInput,
      amount: amountInput,
      measurement: measurementInput,
    });

    ingredientData.current.value = null;
    amount.current.value = null;
    measurement.current.value = "Please select";
  }

  return (
    <section name="formData">
      <h3>{headerText}</h3>
      <IngredientInput
        type="text"
        ref={ingredientData}
        label="Ingredient"
      />
      <IngredientInput
        type="text"
        ref={amount}
        label="Amount"
      />
      <IngredientInput ref={measurement} label="Measurement" select />
			<Button onClick={submitHandler} text='Add Ingredient' />
			<Button onClick={onDone} text="Done" />
    </section>
  );
}

export default IngredientData;
