const calculator = {
    displayValue : '0',
    firstOperand: null,
    waitsecondOperand : false,
    operator : null
}; 
//function ini yg akan menangani smua inputan number ketika di klik
const inputNumber = (number) =>{
    const {displayValue,  waitsecondOperand} = calculator;
    //Jika secondOperator true maka displayValue aakan di overwrite dengan number yang telah di klik
    if ( waitsecondOperand === true){
        calculator.displayValue = number;
        calculator. waitsecondOperand = false;
    }else{
        calculator.displayValue = displayValue === '0' ?  number : displayValue + number;

    }
    console.log(calculator);

}
//Fungsi ini digunakan supaya setiap number yang dimasukkan dapat diikuti dengan titik
const inputDecimal = (dot) => {
    //include digunakan ntuk memeriksa apakah displayValue belum punya decimal
    //Jk belum maka titik akan ditambahkan ke nomor yg dimasukkan
    //Jk tdk maka fungsi akan exit
    if (!calculator.displayValue.includes(dot)){
        calculator.displayValue += dot;
    }
}
//fungsi ini digunakan untuk menanganni semua operator
const inputOperator = (nextOperator) => {
    //destructing object dr calculator
    const {firstOperand, displayValue, operator} = calculator;
    //digunakan untuk mengkonvert string ke float dr displayValue
    const inputValue = parseFloat(displayValue);
    //memeriksa apakah opetor dan waitSecond true dan jk true maka operator digantikan
    //ke opetaor baru 
    if (operator && calculator.waitsecondOperand)  { 
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }
    //kondisi untuk memeriksa aapakah firstOperand null dan apakah inputValue tdk NAN vale
    if (firstOperand  === null && !isNaN (inputValue)){
        //Jika Ya maka firstOperad akan slalu di update
        calculator.firstOperand = inputValue;
    }
    else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        //fungsi calculator digunakan untuk menyimpan result
        //kemudian result disimpan ke displayValue agar ditampilkan 
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
      }
    calculator. waitsecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
  

}

const calculate = (firstOperand, secondOperand, operator) => {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } 
    else if (operator === '-') {
        return firstOperand - secondOperand;
    }
    else if (operator === '*') {
        return firstOperand * secondOperand;
    } 
    else if (operator === '/') {
        return firstOperand / secondOperand;
    }
    return secondOperand;
}
const updateScreen = () => {
    //calculatorScreen digunakan untuk mengambil elemen dengan class .calculator-screen yang digunkan pada input
    const calculatorScreen = document.querySelector('.calculator-screen');
    //digunakan untuk mengupdate nilai elemen dgn displayValue
    calculatorScreen.value = calculator.displayValue;
}

updateScreen();
//digunaakan untuk menghandle semua key pada calcultor
const keys = document.querySelector('.calculator-keys');
keys.addEventListener ('click', (event) => {
    const {target} = event;
    //const target = event.target;

    if (!target.matches ('button')){
        return;
    }
    if (target.classList.contains('operator')){
        inputOperator(target.value);
        updateScreen();
        return;
    }
    if (target.classList.contains('decimal')) {
       inputDecimal(target.value);
       updateScreen();
        return;
    }
    //Jika kita mengklik btn all-clear atau AC maka akan memanggil fungsi clearBtn dan akan mengupdate screen stlah proses hapus number
    if (target.classList.contains('all-clear')) {
        clearBtn();
        updateScreen();

    }
    
    inputNumber(target.value);
    updateScreen();
})
//menghapus number
//function ini akan meng-set smua nilai dr object ke semula atau ke nilai aslinya
const clearBtn = () => {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitsecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}

