class ViewUtilities {
    static createLabel(labelContents, labelFor, labelID = "", labelClassList = []) {
        let newLabel = document.createElement("label");
        newLabel.innerHTML = labelContents;
        newLabel.htmlFor = labelFor;

        if (labelID !== "") {
            newLabel.id = labelID;
        }

        if (Array.isArray(labelClassList) && labelClassList.length > 0) {
            labelClassList.forEach((classElement) => { newLabel.classList.add(classElement) });
        }

        return newLabel;
    }

    static createInput(inputType, inputID, inputName = "", inputClassList = []) {
        let newInput = document.createElement("input");
        newInput.type = inputType;
        newInput.id = inputID;

        if (inputName !== "") {
            newInput.name = inputName;
        }

        if (Array.isArray(inputClassList) && inputClassList.length > 0) {
            inputClassList.forEach((classElement) => { newInput.classList.add(classElement) });
        }

        return newInput;
    }

    static createLabelInputSet(contents, name, baseID, inputType) {
        // Create a new div element
        let newDiv = document.createElement("div");

        // Div attributes
        newDiv.id = baseID + "Div";
        newDiv.classList.add("divLabelInputSet");

        // Add the new label to the div
        newDiv.appendChild(this.createLabel(contents, name, baseID + "Label", ["formLabel"]));

        // Add the new input to the div
        newDiv.appendChild(this.createInput(inputType, baseID + "Input", name, ["formInput"]));

        return newDiv;
    }

    static createSubmitResetSet(formName) {
        // Create a new div element
        let newDiv = document.createElement("div");
        newDiv.id = formName + "SubmitResetDiv";
        newDiv.classList.add("divResetSubmitSet");

        // Add Submit & Reset Buttons
        newDiv.appendChild(this.createInput("reset", formName + "Reset", "",
            ["formSubmit"]));
        newDiv.appendChild(this.createInput("submit", formName + "Submit", "",
            ["formSubmit"]));

        return newDiv;
    }


}

export default ViewUtilities;