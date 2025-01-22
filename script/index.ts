document.getElementById('matrix-selection')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const size = (document.getElementById('matrix-size') as HTMLSelectElement).value;
  var operation = (document.getElementById('operation') as HTMLSelectElement).value;
  localStorage.setItem('matrixSize', size);
  localStorage.setItem('operation', operation);
  window.location.href = 'input.html';
});