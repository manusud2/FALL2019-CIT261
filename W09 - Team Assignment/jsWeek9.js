function addPlayingClass(keyCode) {
    // Retrieve a list of all div elements with a data-key that matches the key code
    let divElementList = Array.from(document.getElementsByTagName("div"));
    let targetElement = divElementList.filter(item => {
        if (item.hasAttribute('data-key')) {
            return item.dataset.key === keyCode;
        } else {
            return false;
        }
    });

    // Add the playing class
    targetElement[0].classList.add("playing");
}

function removeAllPlaying() {
    let divElementList = Array.from(document.getElementsByTagName("div"));

    divElementList.forEach(item => {
        item.classList.remove("playing");
    });
}

function dropElement(keyCode) {
    if (keyCode === null) {
        return;
    }

    // Retrieve a list of all div elements with a data-key that matches the key code
    let divElementList = Array.from(document.getElementsByTagName("div"));
    let targetElement = divElementList.filter(item => {
        if (item.hasAttribute('data-key')) {
            return item.dataset.key === keyCode;
        } else {
            return false;
        }
    });

    if (targetElement[0].hasAttribute("data-pressCount")) {

        // Retrieve the current value of the press count
        let pressCount = parseInt(targetElement[0].dataset.presscount);

        console.log("Key Code:  " + keyCode);
        console.log("Press Count:  " + targetElement[0].dataset.presscount);

        // Increment the press count (reset to 0 on the 10th press
        if (pressCount >= 10) {
            pressCount = 0;
        } else {
            pressCount++;
        }

        // Set the current offset for the element
        targetElement[0].style.transform = `translateY(${pressCount * 10}px)`;

        // Update the press count attribute
        targetElement[0].dataset.presscount = pressCount;
    }
}

window.addEventListener("load", () => {
    // Get an array of all Div elements with the data-key attribute
    let divArray = Array.from(document.getElementsByTagName("div"));
    let dataKeyDivArray = divArray.filter(item => {
        return item.hasAttribute("data-key");
    });

    // For each Data Key Div, add a base data-key element
    dataKeyDivArray.forEach(item => {
        // Remove any existing attribute
        item.removeAttribute("data-pressCount");

        item.setAttribute("data-pressCount", "0");
    });

    // Get an array of audio elements
    let audioArray = Array.from(document.getElementsByTagName("audio"));

    // Add Event Listener for the various keys
    window.addEventListener("keydown", event => {
        let keyCode = null;
        let targetElement = null;

        switch (event.key) {
            case "A":
            case "a":
                keyCode = "65";
                break;
            case "S":
            case "s":
                keyCode = "83";
                break;
            case "D":
            case "d":
                keyCode = "68";
                break;
            case "F":
            case "f":
                keyCode = "70";
                break;
            case "G":
            case "g":
                keyCode = "71";
                break;
            case "H":
            case "h":
                keyCode = "72";
                break;
            case "J":
            case "j":
                keyCode = "74";
                break;
            case "K":
            case "k":
                keyCode = "75";
                break;
            case "L":
            case "l":
                keyCode = "76";
                break;
        }

        // Filter the audio elements
        if (keyCode !== null) {
            targetElement = audioArray.filter((item) => {
                return item.dataset.key === keyCode;
            });

            // Play the target sound
            if (targetElement[0] !== null) {
                // Reset the playing class on each audio element
                removeAllPlaying();

                // Add the playing class to the current audio element
                addPlayingClass(keyCode);

                // Drop the element (reset on the 10th offset)
                dropElement(keyCode);

                // Reset the time of the audio to 0
                targetElement[0].currentTime = 0;

                // Play the audio clip
                targetElement[0].play();
            }
        }
    });

    // Add an event listener to remove the playing class from each audio element when the sound clip has ended
    audioArray.forEach(item => {
        item.addEventListener("ended", () => {
            removeAllPlaying();
        });
    });
});