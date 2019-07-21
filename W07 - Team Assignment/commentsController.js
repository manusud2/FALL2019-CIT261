import CommentsModel from './commentsModel.js';
import CommentsView from './commentsView.js';

const COMMENT_TYPE = {
    HIKE:  "hike"
};

class CommentsController {
    constructor(addCommentsElement, displayCommentsElement) {
        this.addCommentsElement = addCommentsElement;
        this.displayCommentsElement = displayCommentsElement;
        this.commentList = [];
    }

    addComment() {
        // Grab information from form
        let target = document.getElementById("hikeName").innerHTML;
        let commentDate = document.getElementById("commentDateInput").value;
        let comment = document.getElementById("commentInput").value;

        // Build Comment
        let newComment = new CommentsModel(COMMENT_TYPE.HIKE, target, commentDate, comment);

        // Add the new comment to the list
        this.commentList.push(newComment);

        // Save the comments to session storage (intentionally)
        this.saveComments();
    }

    saveComments() {
        console.log(this.commentList);
        // Extract all hike comments in the comments list
        let hikeComments = this.commentList.filter(element => {
            console.log(element);
            return element.commentType === COMMENT_TYPE.HIKE;
        });

        // Convert the comments list to JSON
        let hikeCommentsJSON = CommentsModel.commentsToJSON(hikeComments);

        // Save the comments to Session Storage
        window.sessionStorage.setItem(COMMENT_TYPE.HIKE, hikeCommentsJSON);
    }

    retrieveComments() {
        return CommentsModel.jsonToComments(window.sessionStorage.getItem(COMMENT_TYPE.HIKE));
    }

    addCommentForm(parentElement, hikeName) {
        parentElement.appendChild(CommentsView.buildCommentInsert(hikeName, (event) => {
            // Prevent the default form action
            event.preventDefault();

            // Add the comment
            this.addComment();

            // Clear the form
            document.getElementById("addCommentForm").reset();
        }));
    }

    clearCommentForm(parentElement) {
        parentElement.innerHTML = "";
    }

    clearCommentList(parentElement) {
        parentElement.innerHTML = "";
    }

    displayComments(parentElement, hikeName) {
        // Retrieve and filter the array of comments
        let commentsArray = this.retrieveComments();
        if (commentsArray === null) {
            parentElement.innerHTML = "<hr/><b>NO COMMENTS TO DISPLAY</b><hr/>";
        } else {
            let hikeCommentsArray = commentsArray.filter(element => {
                return element.commentType === COMMENT_TYPE.HIKE &&
                    element.targetName === hikeName;
            });

            // Render the comments
            parentElement.appendChild(CommentsView.renderCommentDisplay(hikeCommentsArray));
        }
    }
}

export default CommentsController;