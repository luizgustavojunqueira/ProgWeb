// Descrição: Script para a calculadora
/**
 * Neste exercício você deverá implementar a lógica de uma calculadora (com JS).
 * Para isso é provido um conjunto de arquivos-base e você deverá trabalhar no somente
 * no arquivo "script.js". Ele contém comentários indicando o que deve ser feito, mas vocês
 * são livres para modificar e adotar uma estrutura própria.
 *
 * A calculadora deve possuir as seguintes funcionalidades:
 * - Adição de números
 * - Subtração de números
 * - Multiplicação de números
 * - Divisão de números
 * - Limpar o visor
 * - Inverter o sinal do número
 * - Deletar o último caractere
 * - Exibir o resultado da operação
 * - Evitar que o usuário digite dois operadores seguidos
 * - Evitar que o usuário digite um operador no início da operação
 * - Evitar que o usuário divida um número por zero
 * - Evitar que o usuário digite mais de um ponto em um número
 * - Evitar que o usuário digite mais de um zero no início de um número
 * - Evitar que o usuário digite mais de um operador no início da operação
 * - Evitar que o usuário digite mais de um operador no final da operação
 */

// Declaração de variáveis globais:
// - elementoResultado: representa o visor da calculadora
// - botaoAC: botão que limpa o visor
// - botaoMaisMenos: botão que inverte o sinal do número
// - botaoDeletar: botão que deleta o último caractere
// - botoesPadroes: botões que representam os números e operadores da calculadora
// - botaoResultado: botão que exibe o resultado da operação
// Dica 1: Utilize o método querySelector para selecionar os elementos do HTML pelo nome da classe

let elementoResultado = document.querySelector(".js-resultado");
let botaoAC = document.querySelector(".js-btn-ac");
let botaoMaisMenos = document.querySelector(".js-btn-mais-menos");
let botaoDeletar = document.querySelector(".js-btn-del");
let botoesPadroes = document.querySelectorAll(".js-btn-padroes");
let botaoResultado = document.querySelector(".js-btn-igual");
let operadores = ["+", "-", "*", "/"];
let numeroAtual = "";
let digitos = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Função que adiciona um número ou operador ao visor da calculadora
//TODO: Implemente a lógica da função

function adicionarNumeroOperador(valor) {
  if (valor == ".") {
    return;
  }

  if (operadores.indexOf(valor) == -1) {
    numeroAtual += valor;
  } else {
    numeroAtual = "";
  }

  if (verificaPonto() == false) {
    elementoResultado.value += valor;
    verificaZeroInicio();
    if (verificaOperadorSeguido()) {
      removeElemento();
    }
  }
}

function removeElemento() {
  elementoResultado.value = elementoResultado.value.slice(0, -1);
}

// Função que verifica se o usuário digitou mais de um operador seguido
//TODO: Implemente a lógica da função
function verificaOperadorSeguido() {
  if (elementoResultado.value.length > 1) {
    let ultimoChar =
      elementoResultado.value[elementoResultado.value.length - 1];
    let penultimoChar =
      elementoResultado.value[elementoResultado.value.length - 2];

    if (
      operadores.indexOf(ultimoChar) != -1 &&
      operadores.indexOf(penultimoChar) != -1
    ) {
      return true;
    } else if (
      ultimoChar == penultimoChar &&
      (operadores.find(ultimoChar) != -1 ||
        operadores.find(penultimoChar) != -1)
    ) {
      return true;
    }
  }
  return false;
}

// Função que verifica se o usuário digitou mais de um ponto em um número
// TODO: Implemente a lógica da função

function verificaPonto() {
  let ponto = numeroAtual.split(".");
  if (ponto.length > 2) {
    return true;
  }
  return false;
}

// Função que verifica se o usuário digitou mais de um zero no início de um número
// TODO: Implemente a lógica da função
function verificaZeroInicio() {
  if (elementoResultado.value.length > 1) {
    if (
      elementoResultado.value[elementoResultado.value.length - 1] == "0" &&
      operadores.indexOf(
        elementoResultado.value[elementoResultado.value.length - 2]
      ) != -1
    ) {
      removeElemento();
    }
  } else if (elementoResultado.value[0] == "0") {
    removeElemento();
  }
}

botaoMaisMenos.addEventListener("click", () => {
  if (elementoResultado.value[0] == "-") {
    elementoResultado.value = elementoResultado.value.slice(1);
  } else {
    elementoResultado.value = "-" + elementoResultado.value;
  }
});

botaoAC.addEventListener("click", () => {
  elementoResultado.value = "";
  numeroAtual = "";
});

botaoDeletar.addEventListener("click", () => {
  elementoResultado.value = elementoResultado.value.slice(0, -1);
  numeroAtual = numeroAtual.slice(0, -1);
});

botoesPadroes.forEach((botao) => {
  botao.addEventListener("click", () => {
    adicionarNumeroOperador(botao.dataset.valor);
  });
});

botaoResultado.addEventListener("click", () => {
  let resultado = eval(elementoResultado.value);
  elementoResultado.value = resultado;
});

elementoResultado.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    let resultado = eval(elementoResultado.value);
    elementoResultado.value = resultado;
  }
  if (
    operadores.indexOf(
      elementoResultado.value[elementoResultado.value.length - 1]
    ) != -1 &&
    operadores.indexOf(event.key) != -1
  ) {
    event.preventDefault();
  }

  if (elementoResultado.value.length > 1) {
    if (
      event.key == "0" &&
      operadores.indexOf(
        elementoResultado.value[elementoResultado.value.length - 1]
      ) != -1
    ) {
      event.preventDefault();
    }
  } else if (elementoResultado.value[0] == "0") {
    removeElemento();
  }

  if (digitos.indexOf(event.key) != -1 || event.key == ".") {
    if (operadores.indexOf(event.key) == -1) {
      numeroAtual += event.key;
      console.log(numeroAtual);
    } else {
      numeroAtual = "";
    }
    if (verificaPonto()) {
      event.preventDefault();
      numeroAtual = numeroAtual.slice(0, -1);
    }

    if (elementoResultado.value.length == 0 && event.key == ".") {
      event.preventDefault();
    }
  }
});
