import "./style.css"; // don't remove this

const output_text = document.querySelector("#output_text");
const input_text = document.querySelector("#input_text");
const keys = document.querySelectorAll(".key");

let input = "";

// loop all data from dataset
for (let key of keys) {
  let value = key.dataset.key; // get value

  // add event listener for every value in the button
  key.addEventListener("click", () => {
    if (value == "clear") {
      input = "";
      input_text.textContent = "";
      output_text.textContent = 0;
    } else if (value == "backspace") {
      input = input.slice(0, -1); // remove last element
      input_text.textContent = cleanInput(input);
    } else if (value == "=") {
      let result = eval(input); // Evaluates JavaScript code and executes it.
      output_text.textContent = cleanOutput(result);
    } else if (value == "brackets") {
      if (
        input.indexOf("(") == -1 || // if ( not exist
        (input.indexOf("(") != -1 && // or if ( exist
          input.indexOf(")") != -1 && // and if ) exist
          input.lastIndexOf("(") < input.lastIndexOf(")")) // and last occurance index of ( is less than ) closing
      ) {
        input += "("; // add open parenthesis
        input_text.textContent = cleanInput(input);
      } else if (
        (input.indexOf("(") != -1 && input.indexOf(")") == -1) ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") > input.lastIndexOf(")"))
      ) {
        input += ")"; // add closing parenthesis
        input_text.textContent = cleanInput(input);
      }
    } else {
      input += value;
      input_text.textContent = cleanInput(input);
    }
  });
}

function cleanInput(input) {
// input = // "1+2-4/5*3"
  let input_arr = input.split(""); // ["1","+","2","-","4","/","*","3"];
  let input_arr_length = input_arr.length;

  for (let i = 0; i <= input_arr_length; i++) {
    if(input_arr[i] == "*") {
      input_arr[i] = " x ";
    }else if(input_arr[i] == "+"){
        input_arr[i] = " + ";
    }else if(input_arr[i] == "-"){
        input_arr[i] = " - ";
    }else if(input_arr[i] == "%"){
        input_arr[i] = " % ";
    }
  }
  return input_arr.join(""); // "1 + 2 - 4 / 5 * 3"
}


function cleanOutput(result){
    // let result = 123456789.789;
    let output_string = result.toString() // number to string => "123456.789"
    let decimal = output_string.split(".")[1] //["123456", "789"] split by . and store 1 st index value in decimal variable => "789"
    output_string = output_string.split(".")[0] // re assign whole number 0 th index value to output_string => "123456"
    
    let output_array = output_string.split("") // ["1","2",...]

    if(output_array.length > 3){
        for (let i = output_array.length - 3; i > 0; i -= 3){
            output_array.splice(i, 0, ","); // add , using splice method
        }
    }

    if(decimal){
        output_array.push(".");
        output_array.push(decimal);
    }

    return output_array.join("")
}

// cleanOutput(123456)