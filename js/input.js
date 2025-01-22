"use strict";
const matrixSize = Number(localStorage.getItem('matrixSize'));
var operation = localStorage.getItem('operation') || '';
const container = document.getElementById('matrix-inputs');
for (let i = 0; i < matrixSize; i++) {
    const row = document.createElement('div');
    row.classList.add('matrix-row');
    for (let j = 0; j < matrixSize; j++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.name = `matrix-${i}-${j}`;
        row.appendChild(input);
    }
    container.appendChild(row);
}
document.getElementById('matrix-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const matrix = [];
    for (let i = 0; i < matrixSize; i++) {
        const row = [];
        for (let j = 0; j < matrixSize; j++) {
            const value = document.querySelector(`[name="matrix-${i}-${j}"]`).value;
            row.push(Number(value));
        }
        matrix.push(row);
    }
    localStorage.setItem('matrixData', JSON.stringify(matrix));
    window.location.href = 'result.html';
});
