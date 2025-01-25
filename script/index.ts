// Matrix Class
class Matrix {
	private data: number[][];

	constructor(public size: number) {
		this.data = Array.from({ length: size }, () => Array(size).fill(0));
	}

	get(row: number, col: number): number {
		return this.data[row][col];
	}

	set(row: number, col: number, value: number): void {
		this.data[row][col] = value;
	}

	add(matrix: Matrix): Matrix {
		const result = new Matrix(this.size);
		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				result.set(i, j, this.get(i, j) + matrix.get(i, j));
			}
		}
		return result;
	}

	subtract(matrix: Matrix): Matrix {
		const result = new Matrix(this.size);
		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				result.set(i, j, this.get(i, j) - matrix.get(i, j));
			}
		}
		return result;
	}

	multiply(matrix: Matrix): Matrix {
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

	determinant(): number {
		if (this.size === 2) {
			return this.get(0, 0) * this.get(1, 1) - this.get(0, 1) * this.get(1, 0);
		} else if (this.size === 3) {
			return (
				this.get(0, 0) * (this.get(1, 1) * this.get(2, 2) - this.get(1, 2) * this.get(2, 1)) -
				this.get(0, 1) * (this.get(1, 0) * this.get(2, 2) - this.get(1, 2) * this.get(2, 0)) +
				this.get(0, 2) * (this.get(1, 0) * this.get(2, 1) - this.get(1, 1) * this.get(2, 0))
			);
		}
		return 0;
	}

	transpose(): Matrix {
		const result = new Matrix(this.size);
		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				result.set(j, i, this.get(i, j));
			}
		}
		return result;
	}

	adjoint(): Matrix {
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
	const matrixSizeSelect = document.getElementById("matrix-size") as HTMLSelectElement;
	const matrixA = document.getElementById("matrix-a") as HTMLDivElement;
	const matrixB = document.getElementById("matrix-b") as HTMLDivElement;
	const resultMatrix = document.getElementById("result-matrix") as HTMLDivElement;

	let size = 2;
	let matrixAInstance = new Matrix(size);
	let matrixBInstance = new Matrix(size);

	function renderMatrixInputs(size: number): void {
		matrixA.innerHTML = generateMatrixHTML("A", size);
		matrixB.innerHTML = generateMatrixHTML("B", size);
		matrixA.style.gridTemplateColumns = `repeat(${size}, 48px)`
		matrixB.style.gridTemplateColumns = `repeat(${size}, 48px)`
	}

	function generateMatrixHTML(name: string, size: number): string {
		let html = "";
		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size; j++) {
				html += `<input type="number" id="${name}-${i}-${j}" placeholder="0">`;
			}
			// html += "<br>";
		}
		return html;
	}

	function updateMatrices(): void {
		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size; j++) {
				matrixAInstance.set(i, j, parseFloat((document.getElementById(`A-${i}-${j}`) as HTMLInputElement).value) || 0);
				matrixBInstance.set(i, j, parseFloat((document.getElementById(`B-${i}-${j}`) as HTMLInputElement).value) || 0);
			}
		}
	}

	function displayResult(result: Matrix | number): void {
		if (typeof result === "number") {
			resultMatrix.innerHTML = `<div class="result-value">Determinant: ${result}</div>`;
		} else {
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

	document.getElementById("add")?.addEventListener("click", () => {
		updateMatrices();
		const result = matrixAInstance.add(matrixBInstance);
		displayResult(result);
	});

	document.getElementById("subtract")?.addEventListener("click", () => {
		updateMatrices();
		const result = matrixAInstance.subtract(matrixBInstance);
		displayResult(result);
	});

	document.getElementById("multiply")?.addEventListener("click", () => {
		updateMatrices();
		const result = matrixAInstance.multiply(matrixBInstance);
		displayResult(result);
	});

	document.getElementById("determinant-a")?.addEventListener("click", () => {
		updateMatrices();
		const result = matrixAInstance.determinant();
		displayResult(result);
	});

	document.getElementById("determinant-b")?.addEventListener("click", () => {
		updateMatrices();
		const result = matrixBInstance.determinant();
		displayResult(result);
	});

	document.getElementById("transpose-a")?.addEventListener("click", () => {
		updateMatrices();
		const result = matrixAInstance.transpose();
		displayResult(result);
	});

	document.getElementById("transpose-b")?.addEventListener("click", () => {
		updateMatrices();
		const result = matrixBInstance.transpose();
		displayResult(result);
	});

	document.getElementById("adjoint-a")?.addEventListener("click", () => {
		updateMatrices();
		const result = matrixAInstance.adjoint();
		displayResult(result);
	});

	document.getElementById("adjoint-b")?.addEventListener("click", () => {
		updateMatrices();
		const result = matrixBInstance.adjoint();
		displayResult(result);
	});

	renderMatrixInputs(size);
});