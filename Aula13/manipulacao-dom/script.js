function rotacionar() {
  var lista = document.getElementById("lista");
  var primeiro = lista.firstElementChild;
  primeiro.remove();
  lista.append(primeiro);
}
