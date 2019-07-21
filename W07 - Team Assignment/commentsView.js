import ViewUtilities from "./jsViewUtilities.js";

class CommentsView {
    constructor() {

    }

    static buildCommentInsert(hikeName, functionRef) {
        // Create the form to add
        const newForm = document.createElement("form");
        newForm.id = "addCommentForm";

        // Add a reference to the function to be executed when submitting the form
        newForm.onsubmit = functionRef;

        // Add a header and instructions to the form
        let formHeader = document.createElement("h2");
        formHeader.innerHTML = "ADD COMMENTS";

        let formInstructions = document.createElement("p");
        formInstructions.innerHTML = "Please enter in all information and then click on Submit";

        let hikeNameElement = document.createElement("p");
        hikeNameElement.id = "hikeName";
        hikeNameElement.innerHTML = hikeName;

        newForm.appendChild(formHeader);
        newForm.appendChild(formInstructions);
        newForm.appendChild(hikeNameElement);

        // Create the labels and inputs
        newForm.appendChild(ViewUtilities.createLabelInputSet("Comment Date", "commentDate",
            "commentDate", "date"));

        newForm.appendChild(ViewUtilities.createLabelInputSet("Comment",
            "comment", "comment", "text"));

        // Add a Submit and Reset Button
        newForm.appendChild(ViewUtilities.createSubmitResetSet("addComment"));

        return newForm;
    }

    static renderCommentDisplay(commentsArray) {
        let commentDisplay = document.createElement("div");

        commentsArray.forEach(element => {
            let newBreak = document.createElement("hr");

            let newHeader = document.createElement("h2");
            newHeader.innerHTML = `Comment for ${element.targetName} on ${element.commentDate}`;

            let newComment = document.createElement("p");
            newComment.innerHTML = element.comment;

            commentDisplay.appendChild(newBreak);
            commentDisplay.appendChild(newHeader);
            commentDisplay.appendChild(newComment);
        });

        let endBreak = document.createElement("hr");
        commentDisplay.appendChild(endBreak);

        return commentDisplay;
    }

}

export default CommentsView;