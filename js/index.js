"use strict";
document.getElementById('matrix-selection').addEventListener('submit', (e) => {
    e.preventDefault();
    const size = document.getElementById('matrix-size').value;
    var operation = document.getElementById('operation').value;
    localStorage.setItem('matrixSize', size);
    localStorage.setItem('operation', operation);
    window.location.href = 'input.html';
});
