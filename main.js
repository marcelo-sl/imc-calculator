// UI fields
const form = document.querySelector('.container form');
let result = document.querySelector('.container .result');

// Clear fields
function clear() {
  document.getElementById('peso').value = '';
  document.getElementById('alt').value = '';
  result.innerHTML = '';
}

// Not a number validation
function notNumber(peso, alt) {
  if (isNaN(peso) || isNaN(alt)) return true;
  return false;
}

// Not a number msg
function notNumberMsg() {
  const error = document.getElementById('errors');
  const alert = document.createElement('div');
  alert.className = 'alert alert-danger';
  alert.innerHTML = 'Informe somente números!';
  error.appendChild(alert);
  setTimeout(() => error.removeChild(alert), 3000);
}

// Show Result
function showResult(imc, situacao) {
  result.innerHTML = `
    <div class="jumbotron jumbotron-fluid">
        <div class="container">
        <h3 class="display-4">${imc.toFixed(2)}</h3>
        <p class="lead situacao">${situacao}</p>
        </div>
    </div>
  `;
}

// Calc function
function calc(peso, alt) {
  const imc = parseFloat(peso) / (parseFloat(alt) * 2);
  let situacao = '';
  if (imc < 18.5) situacao = 'Magreza';
  else if (imc <= 24.9) situacao = 'Saudável';
  else if (imc <= 29.9) situacao = 'Sobrepeso';
  else if (imc <= 34.9) situacao = 'Obesidade Grau I';
  else if (imc <= 39.9) situacao = 'Obesidade Severa Grau II';
  else situacao = 'Obesidade Mórbida Grau III';

  // Show Result
  showResult(imc, situacao);
}

// Application function
function app(e) {
  e.preventDefault();

  const peso = document.getElementById('peso').value.replace(',', '.');
  const alt = document.getElementById('alt').value.replace(',', '.');

  // Clear UI fields
  clear();

  // Not a number validation
  notNumber(peso, alt) ? notNumberMsg() : calc(peso, alt);
}

form.addEventListener('submit', app);
