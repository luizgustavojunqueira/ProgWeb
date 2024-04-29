/*
 *  Script com a lógica do Jogo da Velha
 *  Ele possui o esqueleto dos método essenciais.
 *
 *  DICAS GERAIS:
 *  - Modifique este arquivo o quanto for necessário.
 */

/*Declaração de uma variável que retorna uma lista de elementos presentes no documento 
* que coincidam com o grupo de seletores especificado. 
O objeto retornado é uma NodeList.  
*/
const cells = document.querySelectorAll(".cell");

//Variável que retorna o valor selecionado do statusText
const statusText = document.querySelector("#statusText");

/*Insira aqui as condições de vitória, para isso utilize a lógica do funcionamento
 * do jogo da velha
 */
const winConditions = ["012", "345", "678", "036", "147", "258", "048", "246"];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

// Chamada da função para inicializar o jogo
initializeGame();

// Insira aqui a função para a inicialização do jogo
function initializeGame() {
  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => cellClicked(cell, index));
  });
  document.querySelector("#restart-Btn").addEventListener("click", restartGame);

  statusText.innerText = `Vez do jogador ${currentPlayer}`;
  running = true;
}

// Função para a verificação do clique para adicionar o valor e verifica o vencedor.
function cellClicked(cell, index) {
  if (running) {
    if (options[index] === "") {
      options[index] = currentPlayer;
      updateCell(cell, index);
      checkWinner();
      changePlayer();
    }
  }
}

// Função para atualizar visualização da informação
function updateCell(cell, index) {
  cell.innerText = currentPlayer;
  options[index] = currentPlayer;
}

// Função para escolha e alternância de jogadores
function changePlayer() {
  if (running) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Vez do jogador ${currentPlayer}`;
  }
}

//Função para verificar o vencedor
function checkWinner() {
  winConditions.forEach((condition) => {
    const [a, b, c] = condition.split("");
    if (options[a] && options[a] === options[b] && options[a] === options[c]) {
      statusText.innerText = `O jogador ${currentPlayer} venceu!`;
      running = false;
    }
  });
}

// Função para resert das informações da tela
function restartGame() {
  options = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  running = true;
  statusText.innerText = `Vez do jogador ${currentPlayer}`;
  cells.forEach((cell) => {
    cell.innerText = "";
  });
}
