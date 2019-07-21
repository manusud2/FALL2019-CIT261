//01
//Add a text input and a button. Put an empty div with an ID below those.
//Add a script tag, write a function that will read the contents of the input, and write them to the div.
//Call the function when the button is pressed.

function writeToDiv(){

    document.getElementById("outputDiv").innerHTML = document.getElementById("textInput").value;
}

//02
//Write a new function that expects a number as an argument.
//It should take that number and sum all the numbers up to the number provided. (ie n=5…so it would do 1+2+3+4+5 = 15) It should return that value.
//When the button is pressed it should read the number from the input.
//Make sure it is a valid number, call the summing function you just wrote, and output the result to the div.

function summing(){

    let number=parseInt(document.getElementById("numberInput").value);
    let sum=0;

    for(i=1; i <= number; i++){

        sum+=i;

    }

    document.getElementById("sumOuputDiv").innerHTML=sum;
}

//03
//Add an additional input to your HTML file.
//Add a + button.
//Write a function that will take the numbers from each input, add them together, and output the result to a div

function addMac(){

    let num1=parseFloat(document.getElementById("firstNumber").value);
    let num2=parseFloat(document.getElementById("secondNumber").value);
    let answer=num1+num2;
    document.getElementById("addingMachineDiv").innerHTML="Add them up and you get: "+answer;

}

//Stretch Goals assignment

function Calculator(number1, number2) {
    // Attributes
    this.number1 = number1;
    this.number2 = number2;

    // Methods
    this.sumNumbers = function() {
        return this.number1 + this.number2;
    };

    this.difNumbers = function() {
        return this.number1 - this.number2;
    };

    this.prodNumbers = function() {
        return this.number1 * number2;
    };

    this.quotNumbers = function() {
        return this.number1 / number2;
    };
}

function runSum() {
    // Get Numbers from User
    let number1 = parseFloat(document.getElementById("number1").value);
    let number2 = parseFloat(document.getElementById("number2").value);

    // Make an instance of the calculator
    let newCalculator = new Calculator(number1, number2);

    // Run the addition function on the calculator contents
    let additionAnswer = newCalculator.sumNumbers();

    document.getElementById("output").innerHTML = "Answer: "+additionAnswer;
}

function runDifference() {
    // Get Numbers from User
    let number1 = parseFloat(document.getElementById("number1").value);
    let number2 = parseFloat(document.getElementById("number2").value);

    // Make an instance of the calculator
    let newCalculator = new Calculator(number1, number2);

    // Run the addition function on the calculator contents
    let differenceAnswer = newCalculator.difNumbers();

    document.getElementById("output").innerHTML = "Answer: "+differenceAnswer;
}

function runProduct() {
    // Get Numbers from User
    let number1 = parseFloat(document.getElementById("number1").value);
    let number2 = parseFloat(document.getElementById("number2").value);

    // Make an instance of the calculator
    let newCalculator = new Calculator(number1, number2);

    // Run the addition function on the calculator contents
    let productAnswer = newCalculator.prodNumbers();

    document.getElementById("output").innerHTML = "Answer: "+productAnswer;
}

function runQuotient() {
    // Get Numbers from User
    let number1 = parseFloat(document.getElementById("number1").value);
    let number2 = parseFloat(document.getElementById("number2").value);

    // Make an instance of the calculator
    let newCalculator = new Calculator(number1, number2);

    // Run the addition function on the calculator contents
    let quotientAnswer = newCalculator.quotNumbers();

    document.getElementById("output").innerHTML = "Answer: "+quotientAnswer;
}