// On Load Code
window.addEventListener("load", resetBoard);


function resetBoard() {
    // Reset Victory Status and Player Turn
    document.getElementById("victoryStatus").innerHTML = "";
    document.getElementById("playerTurn").innerHTML = "1";

    // Clear the current board
    let boardContainer = document.getElementById("boardContainer");
    for (let child of boardContainer.children) {
        child.remove();
    }

    // Reconstruct the board
    let board = document.createElement("table");
    board.id = "board";
    for (let i = 0; i < 3; i++) {
        // Construct Board Row
        let boardRow = document.createElement("tr");

        for (let j = 0; j < 3; j++) {
            // Construct cell
            let cell = document.createElement("td");

            // Set border type
            let borderType = "2px solid black";

            // Add appropriate borders
            // Left
            if (j > 0) {
                cell.style.borderLeft = borderType;
            }

            // Right
            if (j < 2) {
                cell.style.borderRight = borderType;
            }

            // Top
            if (i > 0) {
                cell.style.borderTop = borderType;
            }

            // Bottom
            if (i < 2) {
                cell.style.borderBottom = borderType;
            }

            // Size the cell
            let cellSize = "5em";
            cell.style.height = cellSize;
            cell.style.width = cellSize;

            // Center the cell contents
            cell.style.textAlign = "center";
            cell.style.verticalAlign = "center";

            // Size of the cell contents
            cell.style.fontSize = "1em";

            // Add an ID and Class to the cell
            cell.id = "Cell" + (i * 3 + j + 1);
            cell.classList.add("unselected");

            // Add the event listeners
            cell.addEventListener("click", () => {
                selectCell(cell.id);
            });

            // Append the cell to the row
            boardRow.appendChild(cell);
        }

        // Append row
        board.appendChild(boardRow);
    }

    // Collapse the borders
    board.style.borderCollapse = "collapse";

    // Append the finalized board to the target element
    boardContainer.appendChild(board);
}

function selectCell(cellID) {
    // Clear the message box
    document.getElementById("message").innerHTML = "";

    // Target the appropriate cell
    let targetCell = document.getElementById(cellID);

    // Determine if this cell has already been played by a player
    if (!targetCell.classList.contains("unselected")) {
        // If already played, inform the user and end the function
        document.getElementById("message").innerHTML =
            "<p>This cell has already been selected - please choose another cell.</p>";

        return;
    }

    // Retrieve the player turn
    let playerTurn = document.getElementById("playerTurn");
    let currentPlayer = parseInt(playerTurn.innerHTML);

    // Determine the player symbol
    let playerSymbol = (currentPlayer === 1 ? "X" : "O");

    // Add the appropriate symbol to the cell and the class list
    targetCell.innerHTML = playerSymbol;
    targetCell.classList.remove("unselected");
    targetCell.classList.add(playerSymbol);

    // Determine if player has won the game from last move or if there is a stalemate
    if (checkVictory(playerSymbol, cellID)) {
        // Display the victory status
        document.getElementById("victoryStatus").innerHTML = "Player " + currentPlayer + " is the winner!";

        // Remove the listeners and preserve the board
        removeListeners()
    } else if (checkStalemate()) {
        // Display the victory status
        document.getElementById("victoryStatus").innerHTML = "This round is a stalemate.";

        // Remove the listeners and preserve the board
        removeListeners()
    } else {
        // Update the player
        playerTurn.innerHTML = (currentPlayer === 1 ? "2" : "1");
    }
}

function checkVictory(playerSymbol, cellID) {
    // Assign the cell ID's
    let cell1 = document.getElementById("Cell1");
    let cell2 = document.getElementById("Cell2");
    let cell3 = document.getElementById("Cell3");
    let cell4 = document.getElementById("Cell4");
    let cell5 = document.getElementById("Cell5");
    let cell6 = document.getElementById("Cell6");
    let cell7 = document.getElementById("Cell7");
    let cell8 = document.getElementById("Cell8");
    let cell9 = document.getElementById("Cell9");

    // Return if current player is victorious
    switch (cellID) {
        case "Cell1":
            return ((cell2.classList.contains(playerSymbol) && cell3.classList.contains(playerSymbol)) ||
                cell5.classList.contains(playerSymbol) && cell9.classList.contains(playerSymbol) ||
                cell4.classList.contains(playerSymbol) && cell7.classList.contains(playerSymbol));
        case "Cell2":
            return ((cell1.classList.contains(playerSymbol) && cell3.classList.contains(playerSymbol)) ||
                cell5.classList.contains(playerSymbol) && cell8.classList.contains(playerSymbol));
        case "Cell3":
            return ((cell1.classList.contains(playerSymbol) && cell2.classList.contains(playerSymbol)) ||
                cell5.classList.contains(playerSymbol) && cell7.classList.contains(playerSymbol) ||
                cell6.classList.contains(playerSymbol) && cell9.classList.contains(playerSymbol));
        case "Cell4":
            return ((cell1.classList.contains(playerSymbol) && cell7.classList.contains(playerSymbol)) ||
                cell5.classList.contains(playerSymbol) && cell6.classList.contains(playerSymbol));
        case "Cell5":
            return ((cell1.classList.contains(playerSymbol) && cell9.classList.contains(playerSymbol)) ||
                cell2.classList.contains(playerSymbol) && cell8.classList.contains(playerSymbol) ||
                cell3.classList.contains(playerSymbol) && cell7.classList.contains(playerSymbol) ||
                cell4.classList.contains(playerSymbol) && cell6.classList.contains(playerSymbol));
        case "Cell6":
            return ((cell3.classList.contains(playerSymbol) && cell9.classList.contains(playerSymbol)) ||
                cell4.classList.contains(playerSymbol) && cell5.classList.contains(playerSymbol));
        case "Cell7":
            return ((cell1.classList.contains(playerSymbol) && cell4.classList.contains(playerSymbol)) ||
                cell3.classList.contains(playerSymbol) && cell5.classList.contains(playerSymbol) ||
                cell8.classList.contains(playerSymbol) && cell9.classList.contains(playerSymbol));
        case "Cell8":
            return ((cell7.classList.contains(playerSymbol) && cell9.classList.contains(playerSymbol)) ||
                cell2.classList.contains(playerSymbol) && cell5.classList.contains(playerSymbol));
        case "Cell9":
            return ((cell7.classList.contains(playerSymbol) && cell8.classList.contains(playerSymbol)) ||
                cell1.classList.contains(playerSymbol) && cell5.classList.contains(playerSymbol) ||
                cell3.classList.contains(playerSymbol) && cell6.classList.contains(playerSymbol));
    }
}

function checkStalemate() {
    for (let i = 1; i <= 9; i++) {
        if (document.getElementById("Cell" + i).classList.contains("unselected")) {
            return false;
        }
    }

    return true;
}

function removeListeners() {
    // Remove the listener elements on the board by cloning and replacing
    let oldElement = document.getElementById("board");
    let newElement = oldElement.cloneNode(true);
    oldElement.parentNode.replaceChild(newElement, oldElement);
}