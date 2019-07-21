function getPeople(targetURL) {
    let headerJSON = {headers: {Accept:  "application/json"}};

    fetch(targetURL, headerJSON)
        .then(response => {
            return response.json();
        })
        .then(result => {
            // REMOVE THE CONSOLE LOG WHEN DONE
            console.log(result);

            displayPeople(result);
        })
        .catch(() => {
       console.log("ERROR:  Unable to retrieve information");
    });
}

function displayPeople(jsonPeople) {
    // Set the appropriate div elements
    let navigationButtons = document.getElementById("pageNavigation");
    let peopleList = document.getElementById("starWarsPeopleDiv");

    // Clear the current contents for the navigation and people list
    navigationButtons.innerHTML = "";
    peopleList.innerHTML = "";

    // Create the buttons for the navigation with appropriate listeners/status
    let previousButton = document.createElement("button");
    previousButton.innerHTML = "PREVIOUS";
    previousButton.classList.add("navigationButton");
    if (jsonPeople.previous === null) {
        previousButton.disabled = true;
    } else {
        previousButton.addEventListener("click", () => {
            getPeople(jsonPeople.previous);
        });
    }

    let nextButton = document.createElement("button");
    nextButton.innerHTML = "NEXT";
    nextButton.classList.add("navigationButton");
    if (jsonPeople.next === null) {
        nextButton.disabled = true;
    } else {
        nextButton.addEventListener("click", () => {
            getPeople(jsonPeople.next);
        });
    }

    // Add the navigation buttons
    navigationButtons.appendChild(previousButton);
    navigationButtons.appendChild(nextButton);

    // Extract the people array from the JSON object
    let people = jsonPeople.results;

    // Construct a list to contain the people
    let insertList = document.createElement("ul");
    insertList.classList.add("peopleList");

    people.forEach(item => {
        // Create the List Item
        let insertListItem = document.createElement("li");
        insertListItem.classList.add("peopleListItem");

        // Add the name of the individual to the list item
        let insertName = document.createElement("h2");
        insertName.classList.add("itemName");
        insertName.innerHTML = item.name;
        insertListItem.appendChild(insertName);

        // Add a container for all other individual information
        let insertData = document.createElement("div");
/*
        let insertDataID = "people" + removeSpaceFromString(item.name);
        insertData.id = insertDataID;
*/
        insertData.classList.add("toggleViewOff");
        insertData.appendChild(
            individualDataContainer("Birth Year", item.birth_year.toUpperCase())
        );
        insertData.appendChild(
            individualDataContainer("Gender", item.gender.toUpperCase())
        );
        insertData.appendChild(
            individualDataContainer("Hair Color", item.hair_color.toUpperCase())
        );
        insertData.appendChild(
            individualDataContainer("Height (CM)", item.height.toUpperCase())
        );
        insertData.appendChild(
            individualDataContainer("Mass (KG)", item.mass.toUpperCase())
        );
        insertData.appendChild(
            individualDataContainer("Skin Color", item.skin_color.toUpperCase())
        );

        // Append the Other Information to the List Item
        insertListItem.appendChild(insertData);

        // Add a listener to the list name to toggle the view via CSS
        insertListItem.addEventListener("click", () => {
            toggleView(insertData);
        });

        // Append the List Item to the list
        insertList.appendChild(insertListItem);
    });

    // Add the completed list to the target
    peopleList.appendChild(insertList);
}

function individualDataContainer(attribute, value) {
    // Create the Container
    let thisContainer = document.createElement("div");

    // Set the Attribute Header
    let thisAttribute = document.createElement("h3");
    thisAttribute.classList.add("individualAttributeType");
    thisAttribute.innerHTML = attribute;

    // Set the Attribute Value
    let attributeValue = document.createElement("p");
    attributeValue.classList.add("individualAttributeValue");
    attributeValue.innerHTML = value;

    // Load the items on the container
    thisContainer.appendChild(thisAttribute);
    thisContainer.appendChild(attributeValue);

    // Return the Completed Container
    return thisContainer;
}

function removeSpaceFromString(input) {
    return input.replace(/\s+/g, '');
}

function toggleView(targetElement) {
    if (targetElement.classList.contains("toggleViewOff")) {
        targetElement.classList.remove("toggleViewOff");
        targetElement.classList.add("toggleViewOn");
    } else {
        targetElement.classList.add("toggleViewOff");
        targetElement.classList.remove("toggleViewOn");
    }
}

window.addEventListener("load", () => {
    // Fetch the data from the API
    // https://swapi.co/api/people/
    let targetURL = "https://swapi.co/api/people/?format=json&page=1";

    getPeople(targetURL);
});