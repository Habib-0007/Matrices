"use strict";
// Matrix Class
class Matrix {
    constructor(size) {
        this.size = size;
        this.data = Array.from({ length: size }, () => Array(size).fill(0));
    }
    get(row, col) {
        return this.data[row][col];
    }
    set(row, col, value) {
        this.data[row][col] = value;
    }
    add(matrix) {
        const result = new Matrix(this.size);
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                result.set(i, j, this.get(i, j) + matrix.get(i, j));
            }
        }
        return result;
    }
    subtract(matrix) {
        const result = new Matrix(this.size);
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                result.set(i, j, this.get(i, j) - matrix.get(i, j));
            }
        }
        return result;
    }
    multiply(matrix) {
        const result = new Matrix(this.size);
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                let sum = 0;
                for (let k = 0; k < this.size; k++) {
                    sum += this.get(i, k) * matrix.get(k, j);
                }
                result.set(i, j, sum);
            }
        }
        return result;
    }
    determinant() {
        if (this.size === 2) {
            return this.get(0, 0) * this.get(1, 1) - this.get(0, 1) * this.get(1, 0);
        }
        else if (this.size === 3) {
            return (this.get(0, 0) * (this.get(1, 1) * this.get(2, 2) - this.get(1, 2) * this.get(2, 1)) -
                this.get(0, 1) * (this.get(1, 0) * this.get(2, 2) - this.get(1, 2) * this.get(2, 0)) +
                this.get(0, 2) * (this.get(1, 0) * this.get(2, 1) - this.get(1, 1) * this.get(2, 0)));
        }
        return 0;
    }
    transpose() {
        const result = new Matrix(this.size);
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                result.set(j, i, this.get(i, j));
            }
        }
        return result;
    }
    adjoint() {
        if (this.size === 2) {
            const result = new Matrix(this.size);
            result.set(0, 0, this.get(1, 1));
            result.set(0, 1, -this.get(0, 1));
            result.set(1, 0, -this.get(1, 0));
            result.set(1, 1, this.get(0, 0));
            return result;
        }
        return new Matrix(this.size);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const matrixSizeSelect = document.getElementById("matrix-size");
    const matrixA = document.getElementById("matrix-a");
    const matrixB = document.getElementById("matrix-b");
    const resultMatrix = document.getElementById("result-matrix");
    let size = 2;
    let matrixAInstance = new Matrix(size);
    let matrixBInstance = new Matrix(size);
    function renderMatrixInputs(size) {
        matrixA.innerHTML = generateMatrixHTML("A", size);
        matrixB.innerHTML = generateMatrixHTML("B", size);
        matrixA.style.gridTemplateColumns = `repeat(${size}, 48px)`;
        matrixB.style.gridTemplateColumns = `repeat(${size}, 48px)`;
    }
    function generateMatrixHTML(name, size) {
        let html = "";
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                html += `<input type="number" id="${name}-${i}-${j}" placeholder="0">`;
            }
            // html += "<br>";
        }
        return html;
    }
    function updateMatrices() {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                matrixAInstance.set(i, j, parseFloat(document.getElementById(`A-${i}-${j}`).value) || 0);
                matrixBInstance.set(i, j, parseFloat(document.getElementById(`B-${i}-${j}`).value) || 0);
            }
        }
    }
    function displayResult(result) {
        if (typeof result === "number") {
            resultMatrix.innerHTML = `<div class="result-value">Determinant: ${result}</div>`;
        }
        else {
            let html = "<table>";
            for (let i = 0; i < size; i++) {
                html += "<tr>";
                for (let j = 0; j < size; j++) {
                    html += `<td>${result.get(i, j)}</td>`;
                }
                html += "</tr>";
            }
            html += "</table>";
            resultMatrix.innerHTML = html;
        }
    }
    matrixSizeSelect.addEventListener("change", () => {
        size = parseInt(matrixSizeSelect.value);
        matrixAInstance = new Matrix(size);
        matrixBInstance = new Matrix(size);
        renderMatrixInputs(size);
    });
    (_a = document.getElementById("add")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        updateMatrices();
        const result = matrixAInstance.add(matrixBInstance);
        displayResult(result);
    });
    (_b = document.getElementById("subtract")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        updateMatrices();
        const result = matrixAInstance.subtract(matrixBInstance);
        displayResult(result);
    });
    (_c = document.getElementById("multiply")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
        updateMatrices();
        const result = matrixAInstance.multiply(matrixBInstance);
        displayResult(result);
    });
    (_d = document.getElementById("determinant-a")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
        updateMatrices();
        const result = matrixAInstance.determinant();
        displayResult(result);
    });
    (_e = document.getElementById("determinant-b")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
        updateMatrices();
        const result = matrixBInstance.determinant();
        displayResult(result);
    });
    (_f = document.getElementById("transpose-a")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", () => {
        updateMatrices();
        const result = matrixAInstance.transpose();
        displayResult(result);
    });
    (_g = document.getElementById("transpose-b")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", () => {
        updateMatrices();
        const result = matrixBInstance.transpose();
        displayResult(result);
    });
    (_h = document.getElementById("adjoint-a")) === null || _h === void 0 ? void 0 : _h.addEventListener("click", () => {
        updateMatrices();
        const result = matrixAInstance.adjoint();
        displayResult(result);
    });
    (_j = document.getElementById("adjoint-b")) === null || _j === void 0 ? void 0 : _j.addEventListener("click", () => {
        updateMatrices();
        const result = matrixBInstance.adjoint();
        displayResult(result);
    });
    renderMatrixInputs(size);
});
