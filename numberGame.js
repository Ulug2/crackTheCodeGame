document.addEventListener("DOMContentLoaded", function() {
    const checkBtn = document.getElementById("check-btn");
    const startBtn = document.getElementById("start-btn");
    let myNumbers = [];
    const inputEl1 = document.getElementById("inp-1");
    const inputEl2 = document.getElementById("inp-2");
    const inputEl3 = document.getElementById("inp-3");
    const inputEl4 = document.getElementById("inp-4");
    const outputTxt = document.getElementById("output-text");
    const secondTxt = document.getElementById("second-text");
    let randomArr = [];
    let arrayContain = [];
    let arrayIndex = [];
    const h2 = document.getElementById("h2");
    const h3 = document.getElementById("h3");
    let listOutput = [];
    const ulEl = document.getElementById("ul-el");
    const restartBtn = document.getElementById("restart-btn");

    startBtn.addEventListener("click", function() {
        randomArr = [generateRandom(), generateRandom(), generateRandom(), generateRandom()];
        // h2.textContent = JSON.stringify(randomArr);
    });

    restartBtn.addEventListener("click", function() {
        myNumbers = [];
        randomArr = [];
        arrayContain = [];
        arrayIndex = [];
        listOutput = [];
        randomArr = [generateRandom(), generateRandom(), generateRandom(), generateRandom()];
        h2.textContent = JSON.stringify(randomArr);
        outputTxt.textContent = "";
        secondTxt.textContent = "";
        ulEl.innerHTML = '';
        h3.textContent = ''
    });

    function generateRandom() {
        return Math.floor(Math.random() * 10);
    }

    checkBtn.addEventListener("click", function() {
        myNumbers = [parseInt(inputEl1.value), parseInt(inputEl2.value), parseInt(inputEl3.value), parseInt(inputEl4.value)];
        arrayContain = [];
        arrayIndex = [];

        if (checkIfEqual(myNumbers, randomArr)) {
            h3.textContent = "You cracked the code!";
            outputTxt.textContent = "";
            secondTxt.textContent = "";
            listOutput.push("You cracked the code!");
        } 
        else {
            checkIfContains(myNumbers, randomArr);
            const containSum = sum(arrayContain);
            const indexSum = sum(arrayIndex);

            if (containSum === 1) outputTxt.textContent = "One number is correct";
            else if (containSum === 2) outputTxt.textContent = "Two numbers are correct";
            else if (containSum === 3) outputTxt.textContent = "Three numbers are correct";
            else if (containSum === 4) outputTxt.textContent = "Four numbers are correct";
            else outputTxt.textContent = "None of them is correct ";

            if (indexSum === 1) secondTxt.textContent = "One is well placed ";
            else if (indexSum === 2) secondTxt.textContent = "Two of them are well placed ";
            else if (indexSum === 3) secondTxt.textContent = "Three of them are well placed ";
            else if (indexSum === 4) secondTxt.textContent = "Four of them are well placed ";
            else secondTxt.textContent = "None of them is well placed ";

            listOutput.push(outputTxt.textContent);
            listOutput.push(secondTxt.textContent);
            listOutput.push(convertToString(myNumbers));
        }

        render(listOutput);
    });

    function render(output) {
        let listText = '';
        ulEl.innerHTML = '';
        for (let i = 0; i < output.length; i++){
            listText += "<li>" + output[i] + "</li>";
        }
        ulEl.innerHTML = listText;
        myNumbers = [];
    }
    function convertToString(array){
        let result = "";
        for (let i = 0; i < array.length; i++){
            result += JSON.stringify(array[i]);
        }
        return result;
    }

    function checkIfEqual(myGuess, randomNums) {
        for (let i = 0; i < myGuess.length; i++) {
            if (myGuess[i] !== randomNums[i]) {
                return false;
            }
        }
        return true;
    }

    function checkIfContains(myGuess, randomNums) {
        arrayContain = [];
        arrayIndex = [];
        for (let r = 0; r < randomNums.length; r++) {
            for (let c = 0; c < myGuess.length; c++) {
                if (myGuess[c] === randomNums[r]) {
                    arrayContain.push(1);
                    if (c === r) {
                        arrayIndex.push(1);
                    }
                }
            }
        }
    }

    function sum(array) {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i];
        }
        return sum;
    }
});