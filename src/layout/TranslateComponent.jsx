import React, { useEffect } from "react";

const TranslateComponent = () => {
  useEffect(() => {
    // Function to simulate a click event
    const simulateClick = (element) => {
      if (element) {
        console.log("Simulating click on:", element);
        element.click();
      } else {
        console.log("Element not found");
      }
    };

    // Function to handle the button click
    const handleButtonClick = () => {
      // Find the "Translate to Hindi" button using a suitable selector
      const translateButton = document.querySelector(
        "selector-for-translate-button"
      );
      console.log("Translate button found:", translateButton);
      simulateClick(translateButton);
    };

    // Add event listener to the button (assuming the button has an ID of 'auto-translate-button')
    const autoTranslateButton = document.getElementById(
      "auto-translate-button"
    );
    if (autoTranslateButton) {
      console.log("Auto translate button found:", autoTranslateButton);
      autoTranslateButton.addEventListener("click", handleButtonClick);
    } else {
      console.log("Auto translate button not found");
    }

    // Cleanup event listener on component unmount
    return () => {
      if (autoTranslateButton) {
        autoTranslateButton.removeEventListener("click", handleButtonClick);
      }
    };
  }, []);

  return (
    <button id="auto-translate-button">Click to Translate to Hindi</button>
  );
};

export default TranslateComponent;
