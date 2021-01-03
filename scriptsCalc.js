const pad = document.getElementById("pad")
const display = document.getElementById("display")

let operator = ""
let number = "0"
let number1 = ""
let number2 = ""
let result = ""
let equal = false
let dec = false

const writeNumberOnDisplay = (key) =>{

    //si igual es true
    if(equal){
        display.innerHTML = key.textContent
        number = key.textContent

    //si igual es false
    }else{

        //si display muestra "0"
        if(display.textContent==="0"){
            display.innerHTML = key.textContent
            number = key.textContent

        //si display muestra distinto de "0"
        }else{
            display.innerHTML += key.textContent
            number += key.textContent
        }        
    }
    equal = false
}

const saveNumberOne = () =>{

    //si number esta vacio guardamos "0"
    if(number===""){
        number = "0"
    }

    //guardamos float de number en number 1, reiniciamos number
    number1 = parseFloat(number)
    number = ""
    equal = false
}

const saveNumberTwo = () =>{

    //si number tiene contenido lo guardamos en number2 y reiniciamos number
    if(number!==""){
        number2 = parseFloat(number)
        number = ""
    }
}

const selectOperationOnDisplay = (key) =>{
    
    //si existe number y number1 llamamos a getResult
    if(number!=="" && number1!==""){
        getResult(key)
    }

    //si el numero termina en ".", sin numeros decimales, borramos el punto del display
    if(display.textContent.slice(-1)=== "."){
        display.textContent = display.textContent.substring(0,display.textContent.length-1)
    }

    //si operator esta vacio, lo escribimos en display
    if(operator===""){
        display.innerHTML += ` ${key.textContent} `
        operator = key.textContent
    
         dec = false

    //si ya habia operator, lo sustituimos por el nuevo
    }else{
        display.innerHTML = `${number1} ${key.textContent} `
        operator = key.textContent
    
        dec = false
    }

    //si number1 esta vacio, llamamos a saveNumberOne para guardarlo
    if(number1===""){
        saveNumberOne()
    }
}

const resetVariables = () =>{

    //reseteamos las variables para una nueva cuenta
    operator = ""
    number = result
    number1 = ""
    number2 = ""
    result = ""
    equal = true
    dec = false
}

const getResultOnDisplay = (res) =>{

    //si sale el resultado NaN, corregimos a "0" el result
    if(isNaN(res)){
        display.innerHTML = "0"
        result = "0"
    
    //si result es un numero, lo mostramos en display
    }else{
        display.innerHTML = result
    }
}

const getResult = () =>{

    //si tenemos number y number1, llamamos saveNumberTwo para guardar ahi number
    if(number!=="" & number1!==""){
        saveNumberTwo()
    }

    //si el operador es "+" hacemos la suma, mostramos resultado y reseteamos variables
    if(operator==="+"){
        result = number1 + number2
        getResultOnDisplay(result)
        resetVariables()
    }

    //si el operador es "-" hacemos la suma, mostramos resultado y reseteamos variables
    if(operator==="-"){
        result = number1 - number2
        getResultOnDisplay(result)
        resetVariables()
    }

    //si el operador es "x" hacemos la suma, mostramos resultado y reseteamos variables
    if(operator==="×"){
        result = number1 * number2
        getResultOnDisplay(result)
        resetVariables()
    }

    //si el operador es "÷" hacemos la suma, mostramos resultado y reseteamos variables
    if(operator==="÷"){
        result = number1 / number2
        getResultOnDisplay(result)
        resetVariables()
    }

    //esto borra el "." si el numero decimal no tiene decimales
    if(dec && display.textContent.slice(-1)=== "."){
        display.innerHTML = display.innerHTML.substring(0,display.innerHTML.length-1)
        number = display.textContent

        dec = false
    }
}

const clearAll = () =>{

    //borramos todos los parametros y reiniciamos variables
    operator = ""
    number = "0"
    number1 = ""
    number2 = ""
    result = ""
    equal = false
    dec = false

    //mostramos "0" en display
    display.textContent = "0"
}

const writeNumberFloat = (key) =>{

    //si igual es true
    if(!equal){  

        //si decimal es false y operator esta vacio escribimos "." en display y  number
        if(!dec && operator===""){
            display.textContent += key.textContent
            number = display.textContent
            dec = true

        //si decimal es true y operator esta vacio(es decir, tenemos ".")
        }else if(!dec && operator!==""){

            //si number esta vacio tenemos "0."
            if(number===""){
                display.textContent += "0" + key.textContent
                number = "0."

            //si tenemos number es "xxx."
            }else{
                display.textContent += key.textContent
                number += key.textContent
            }
            dec = true
        }

    //si igual es false
    }else{

        //escribimos "0."
        display.textContent = "0" + key.textContent
        number = "0."
        dec = true
        equal = false
    }
}

const whatIsThat = (key) =>{

    //si pulsamos un numero
    if(key.dataset.type==="number"){
        writeNumberOnDisplay(key)
    }

    //si pulsamos un operador
    if(key.dataset.type==="operator"){
        selectOperationOnDisplay(key)
    }

    //si pulsamos "."
    if(key.dataset.type==="decimal"){
            writeNumberFloat(key)
    }

    //si pulsamos "="
    if(key.dataset.type==="equal"){
        getResult(key)

    }

    //si pulsamos "C"
    if(key.dataset.type==="clear"){
        clearAll()
    }
}

const changeSizeOnDisplay = () =>{

    //evitar que la cantidad de digitos desborde del display
    if(display.textContent.length > 14){
        display.style.fontSize = "3em"
    }

    if(display.textContent.length > 19){
        display.style.fontSize = "2em"
    }

    if(display.textContent.length > 30){
        display.style.fontSize = "1.5em"
    }

    if(display.textContent.length < 14){
        display.style.fontSize = "4em"
    }
}

pad.addEventListener("click", (e)=>{
    
    //evento de escucha para saber donde hacemos click
    whatIsThat(e.target)

    //controlar tamaño display
    changeSizeOnDisplay()
})



