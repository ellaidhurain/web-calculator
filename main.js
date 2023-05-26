import './style.css' // don't remove this

const output_text = document.querySelector("#output_text");
const input_text = document.querySelector("#input_text");
const keys = document.querySelectorAll(".key");

let input = '';

// loop all data from dataset
for(let key of keys){
    let value = key.dataset.key // get value

    // add event listener for every value in the button 
    key.addEventListener('click',()=>{
        if(value == "clear"){
            input = "";
            input_text.textContent = "";
            output_text.textContent = 0;
        }else if(value == "backspace"){     
            input = input.slice(0, -1); // remove last element
            input_text.textContent = input;
        }else if(value == "="){
            let result = eval(input); // Evaluates JavaScript code and executes it.
            output_text.textContent = result;
        }else if(value == "brackets"){
            if(
                input.indexOf("(") == -1 || // if ( not exist
                input.indexOf("(") != -1 && // or if ( exist
                input.indexOf(")") != -1 && // and if ) exist
                input.lastIndexOf("(") < input.lastIndexOf(")") // and last occurance index of ( is less than ) closing
             ){
                input += "("; // add open parenthesis
                input_text.textContent = input  
             }else if(
                input.indexOf("(") != -1 &&
                input.indexOf(")") == -1 ||
                input.indexOf("(") != -1 &&
                input.indexOf(")") != -1 &&
                input.lastIndexOf("(") > input.lastIndexOf(")")

              ){
                input += ")"; // add closing parenthesis
                input_text.textContent = input  
              }
        }else{
            input += value
            input_text.textContent = input  
        }
    })
}
