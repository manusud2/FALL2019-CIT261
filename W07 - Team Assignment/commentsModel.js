class CommentsModel {
    constructor(commentType, targetName, commentDate, comment) {
        this.commentType = commentType;
        this.targetName = targetName;
        this.commentDate = commentDate;
        this.comment = comment;
    }

    static commentsToJSON(commentsArray) {
        // Start of JSON Object
        let jsonString = `{"hikeComments":[`;

        // JSON Array of Comments
        let firstItem = true;
        commentsArray.forEach(arrayItem => {
            if (firstItem) {
                firstItem = false;
            } else {
                jsonString += ",";
            }
            jsonString += `{"commentType":"${arrayItem.commentType}"` +
                `,"targetName":"${arrayItem.targetName}"` +
                `,"commentDate":"${arrayItem.commentDate}"` +
                `,"comment":"${arrayItem.comment}"}`;
        });

        // End the JSON Object
        jsonString += "]}";

        return jsonString;
    }

    static jsonToComments(jsonString) {
        if (jsonString !== null) {
            // Parse the string into a JSON object
            let jsonObject = JSON.parse(jsonString);

            let commentArray = [];

            for (let target of jsonObject["hikeComments"]) {
                let newComment = new CommentsModel(
                    target.commentType,
                    target.targetName,
                    target.commentDate,
                    target.comment
                );

                commentArray.push(newComment);
            }

            return commentArray;
        } else {
            return null;
        }
    }

    // ADD FUNCTION TO FILTER COMMENTS BY NAME
}

export default CommentsModel;