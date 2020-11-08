import React from "react";

const PersonForm = ({ name, number, nameInput, numberInput, submit }) => {
  return (
    <form onSubmit={submit}>
      <div>
        name:{" "}
        <input value={name} onInput={nameInput} />
      </div>
      <div>
        number:{" "}
        <input
          value={number}
          onInput={numberInput}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
