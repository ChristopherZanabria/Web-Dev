const numbersArr = Array.from(document.getElementsByClassName("number"));
      const operatorsArr = Array.from(document.getElementsByClassName("operator"));
      const parenthesisArr = Array.from(document.getElementsByClassName("parenthesis"));

      const numberStrs = "0123456789".split("");

      const data = {
        displayString: "0",
        appendStringNum: (newChar) => {
          if (newChar === ".") {
            //decimal + 0?
          }

          if (numberStrs.includes(newChar)) {
            if (data.displayString === "0") {
              data.displayString = "";
            }
            data.displayString += newChar;
          }
          data.updateDisplay();
        },

        appendStringOperator: (newChar) => {
          if (numberStrs.includes(data.displayString.slice(-1)) || data.displayString.slice(-1) === ")") {
            data.displayString += newChar;
          }
          data.updateDisplay();
        },

        appendStringParenthesis: (newChar) => {
          if (newChar === ")") {
            if (data.displayString.split("(").length <= data.displayString.split(")").length) {
              //if there are not enough open parenthesis to add a closing parenthesis terminate early
              return;
            }
            if (operatorsArr.map((operator) => operator.innerText).includes(data.displayString[data.displayString.length - 1])) {
              //early termination for adding parenthesis after operator
              return;
            }
          }
          if (data.displayString === "0") {
            data.displayString = "";
            data.displayString += newChar;
            return;
          }

          data.displayString += newChar;

          data.updateDisplay();
        },
        updateDisplay: () => {
          const display = document.getElementById("display");
          display.innerText = data.displayString;
        },
        evaluateExpression: () => {
            try {
              const result = eval(data.displayString); // Evaluate the mathematical expression
              data.displayString = result.toString(); // Convert result to string
              data.updateDisplay(); // Update the display
            } catch (error) {
              data.displayString = "Error"; // Display error if invalid expression
              data.updateDisplay();
            }
          },
          
      };

    const equalsBtn = document.querySelector(".equals");

    equalsBtn.addEventListener("click", () => {
    data.evaluateExpression();
    });


      const display = document.getElementById("display");
      display.innerText = data.displayString;

      numbersArr.map((elem, i) => {
        elem.addEventListener("click", (evt) => {
          data.appendStringNum(elem.innerText);
        });
      });

      operatorsArr.map((elem, i) => {
        elem.addEventListener("click", (evt) => {
          data.appendStringOperator(elem.innerText);
        });
      });

      parenthesisArr.map((elem, i) => {
        elem.addEventListener("click", (evt) => {
          data.appendStringParenthesis(elem.innerText);
        });
      });
