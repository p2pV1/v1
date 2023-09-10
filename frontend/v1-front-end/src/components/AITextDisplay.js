import React from "react";
import "../styles.css";

const AITextDisplay = ({ aiText, onNext }) => {
  return (
    <>
      <div className="aiTextDisplay">
        <p>{aiText}</p>
      </div>
      <button className="btn-next" onClick={onNext}>
        Next
      </button>
    </>
  );
};

export default AITextDisplay;
