/**
 * Calculadora de IMC
 * Para realizar o cálculo do IMC, é necessário informar o nome, a altura e o peso.
 * O cálculo é feito da seguinte forma: peso / (altura * altura)
 *
 * O resultado é classificado da seguinte forma:
 *  - Abaixo do peso: IMC menor que 18,5
 *  - Peso ideal: IMC entre 18,5 e 24,9
 *  - Levemente acima do peso: IMC entre 25 e 29,9
 *  - Obesidade grau I: IMC entre 30 e 34,9
 *  - Obesidade grau II: IMC entre 35 e 39,9
 *  - Obesidade grau III: IMC maior que 40
 *
 *  https://abeso.org.br/obesidade-e-sindrome-metabolica/calculadora-imc/
 */

function calcIMC(peso, altura){
    return  peso / (altura * altura);
}

function classificaIMC(imc){
    if(imc < 18.5){
        return "Abaixo do peso";
    } else if(imc < 25){
        return "Peso ideal";
    } else if(imc < 30){
        return "Levemente acima do peso";
    } else if(imc < 35){
        return "Obesidade grau I";
    } else if(imc < 40){
        return "Obesidade grau II";
    } else {
        return "Obesidade grau III";
    }
}

function verificaIMC(){
    let nome = document.getElementById("nome").value;
    let altura = parseFloat(document.getElementById("altura").value);
    let peso = parseFloat(document.getElementById("peso").value);

    let imc = calcIMC(peso, altura);

    let classificacao = classificaIMC(imc);

    document.getElementById("resultado").innerHTML = `${nome} possui IMC ${imc.toFixed(2)} e está classificado como: ${classificacao}`;
}

function limpar(){
    document.getElementById("nome").value = "";
    document.getElementById("altura").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("resultado").innerHTML = "";
}

document.getElementById("calcular").addEventListener("click", verificaIMC);
document.getElementById("limpar").addEventListener("click", limpar);