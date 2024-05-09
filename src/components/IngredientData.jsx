// @ts-nocheck
import React, { useRef } from "react";
import IngredientInput from "./IngredientInput.jsx";
import Button from "./Button.jsx";

function IngredientData ({ onAdd, onDone, onAdjust, headerText, btnText }) {
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

    } else if(isNaN(amountInput))
    {
      throw Error('Amount is not a number. Please provide correct amount')
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

  function adjustHandler () {
    const ingredientInput = ingredientData.current.value;
    const amountInput = amount.current.value;
    const measurementInput = measurement.current.value;

    if (
      ingredientInput.trim() === "" ||
      amountInput.trim() === "" ||
      measurementInput.trim() === "Please select"
    ) {
      return;
      //HANDLE ERROR MESSAGE
    }
    onAdjust({
      ingredient: ingredientInput.trim(),
      amount: amountInput.trim(),
      measurement: measurementInput.trim(),
    });
  }

  return (
    <section name="formData">
      <h3>{headerText}</h3>
      <IngredientInput
        type="text"
        ref={ingredientData}
        label="Ingredient"
        select={undefined}
      />
      <IngredientInput
        type="text"
        ref={amount}
        label="Amount"
        select={undefined}
      />
      <IngredientInput ref={measurement} label="Measurement" select />

      {btnText === "Adjust Recipe" ? (
        <Button onClick={adjustHandler} text={btnText} />
      ) : (
        <>
          <Button onClick={submitHandler} text={btnText} />
          <Button onClick={onDone} text="Done" />
        </>
      )}
    </section>
  );
}

export default IngredientData;
