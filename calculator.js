const input = document.getElementById("input");
const clear = document.getElementById("clear");

const sideNum = document.querySelectorAll(".icon");
const centerNum = document.querySelectorAll(".center-icon");
const sideIcon = document.querySelectorAll(".side-icon");

var arr = [];
var nextNum = false;
var usingOperator = false;

function render(){
	const string = arr.join(" ").replaceAll("/", "÷").replaceAll("*", "x");
	input.textContent = string;
}

function compute(numOne, numTwo, operator){
	switch (operator){
		case "/":
			return numOne/numTwo;

		case "*":
			return numOne * numTwo;

		case "-":
			return numOne - numTwo;

		case "+":
			return numOne + numTwo;
	}
}

clear.addEventListener("click", () => {
	input.textContent = "0";
	arr = [];
	nextNum = false;
});

sideNum.forEach(button => {
	button.addEventListener("click", () => {
		if (arr.length == 0){
			arr.push(button.textContent);
			usingOperator = false;
		} else if (!nextNum){
			arr[arr.length - 1] += button.textContent;
			usingOperator = false;
		} else {
			arr.push(button.textContent);
			usingOperator = false;
			nextNum = false;
		}
		render();
	});
});

centerNum.forEach(button => {
	button.addEventListener("click", () => {
		if (arr.length == 0){
			arr.push(button.textContent);
			usingOperator = false;
		} else if (!nextNum){
			arr[arr.length - 1] += button.textContent;
			usingOperator = false;
		} else {
			arr.push(button.textContent);
			usingOperator = false;
			nextNum = false;
		}
		render();
	});
});

sideIcon.forEach(button => {
	button.addEventListener("click", () => {
		const symbol = button.textContent;

		if (symbol == "⌫"){
			if (arr[arr.length - 1]){
				if (arr[arr.length - 1].length == 1){
					arr.pop();
					nextNum = true;
					if (arr[arr.length - 1] == undefined){
						nextNum = false;
					}
				} else {
					arr[arr.length -1] = arr[arr.length - 1].slice(0, -1);
					nextNum = false;
				}
			}
			if (arr.length == 0){
				input.textContent = "0";
			}
		}

		if (arr.length <= 3){
			switch (symbol) {
				case "÷":
					if (!usingOperator){
						arr.push("/");
						nextNum = true;
						usingOperator = true;
					}
					break;

					case "x":
					if (!usingOperator){
						arr.push("*");
						nextNum = true;
						usingOperator = true;
					}
					break;

				case "-":
					if (!usingOperator){
						arr.push("-");
						nextNum = true;
						usingOperator = true;
					}
					break;
				
				case "+":
				if (!usingOperator){
						arr.push("+");
						nextNum = true;
						usingOperator = true;
					}
					break;

				case "•":
					if (!usingOperator && arr[arr.length - 1].indexOf(".") == -1){
						arr[arr.length - 1] += ".";
						nextNum = false;
						usingOperator = true;
					}
					break;
			}
		}

		if (symbol == "="){
			if (!usingOperator && arr[0] && arr[1] && arr[2]){
				input.textContent = compute(arr[0], arr[2], arr[1]).toString();
				arr = [];
				nextNum = false;
				usingOperator = false;
			}			
		} else {
			if (arr.length !== 0){
				render();
			}
		}
	});
});