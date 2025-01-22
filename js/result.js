"use strict";
const matrixData = JSON.parse(localStorage.getItem('matrixData') || '[]');
var operation = localStorage.getItem('operation') || '';
const resultDisplay = document.getElementById('result-display');
// Helper Functions
const addMatrices = (matrixA, matrixB) => {
    return matrixA.map((row, i) => row.map((val, j) => val + matrixB[i][j]));
};
const subtractMatrices = (matrixA, matrixB) => {
    return matrixA.map((row, i) => row.map((val, j) => val - matrixB[i][j]));
};
const multiplyMatrices = (matrixA, matrixB) => {
    const size = matrixA.length;
    const result = Array.from({ length: size }, () => Array(size).fill(0));
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            for (let k = 0; k < size; k++) {
                result[i][j] += matrixA[i][k] * matrixB[k][j];
            }
        }
    }
    return result;
};
const divideMatrixByScalar = (matrix, scalar) => {
    if (scalar === 0)
        throw new Error('Division by zero is not allowed.');
    return matrix.map(row => row.map(val => val / scalar));
};
const transposeMatrix = (matrix) => {
    const size = matrix.length;
    const result = Array.from({ length: size }, () => Array(size).fill(0));
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            result[j][i] = matrix[i][j];
        }
    }
    return result;
};
const determinant = (matrix) => {
    const size = matrix.length;
    if (size === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }
    let det = 0;
    for (let i = 0; i < size; i++) {
        const minor = matrix
            .slice(1)
            .map(row => row.filter((_, index) => index !== i));
        det += (i % 2 === 0 ? 1 : -1) * matrix[0][i] * determinant(minor);
    }
    return det;
};
const adjointMatrix = (matrix) => {
    const size = matrix.length;
    const adjoint = Array.from({ length: size }, () => Array(size).fill(0));
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const minor = matrix
                .filter((_, row) => row !== i)
                .map(row => row.filter((_, col) => col !== j));
            adjoint[j][i] = (determinant(minor) * (i + j % 2 === 0 ? 1 : -1));
        }
    }
    return adjoint;
};
const inverseMatrix = (matrix) => {
    const det = determinant(matrix);
    if (det === 0)
        throw new Error('Matrix is singular and cannot be inverted.');
    const adj = adjointMatrix(matrix);
    return divideMatrixByScalar(adj, det);
};
// Display Matrix
const displayMatrix = (matrix) => {
    return `<table>${matrix
        .map(row => `<tr>${row.map(cell => `<td>${cell.toFixed(2)}</td>`).join('')}</tr>`)
        .join('')}</table>`;
};
// Handle Operations
try {
    let result = [];
    switch (operation) {
        case 'add':
            const matrixB = JSON.parse(localStorage.getItem('matrixDataB') || '[]');
            result = addMatrices(matrixData, matrixB);
            resultDisplay.innerHTML = `<h2>Result of Addition:</h2>${displayMatrix(result)}`;
            break;
        case 'subtract':
            const matrixBSub = JSON.parse(localStorage.getItem('matrixDataB') || '[]');
            result = subtractMatrices(matrixData, matrixBSub);
            resultDisplay.innerHTML = `<h2>Result of Subtraction:</h2>${displayMatrix(result)}`;
            break;
        case 'multiply':
            const matrixBMul = JSON.parse(localStorage.getItem('matrixDataB') || '[]');
            result = multiplyMatrices(matrixData, matrixBMul);
            resultDisplay.innerHTML = `<h2>Result of Multiplication:</h2>${displayMatrix(result)}`;
            break;
        case 'determinant':
            const det = determinant(matrixData);
            resultDisplay.innerHTML = `<h2>Determinant:</h2><p>${det.toFixed(2)}</p>`;
            break;
        case 'transpose':
            result = transposeMatrix(matrixData);
            resultDisplay.innerHTML = `<h2>Transpose:</h2>${displayMatrix(result)}`;
            break;
        case 'adjoint':
            result = adjointMatrix(matrixData);
            resultDisplay.innerHTML = `<h2>Adjoint:</h2>${displayMatrix(result)}`;
            break;
        case 'inverse':
            result = inverseMatrix(matrixData);
            resultDisplay.innerHTML = `<h2>Inverse:</h2>${displayMatrix(result)}`;
            break;
        default:
            resultDisplay.innerHTML = `<p>Invalid operation selected.</p>`;
    }
}
catch (error) {
    resultDisplay.innerHTML = `<p>Error: ${error.message}</p>`;
}
