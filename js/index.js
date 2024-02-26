/* Two by Two Matrix */
var twoDetBtn = document.querySelector(".two-matrix .det .btn");
var twoDetBack = document.querySelector(".two-matrix .det .result button");
var findDet = document.querySelector(".two-matrix .det .find-det");
var result = document.querySelector(".two-matrix .det .result");
var resultText = document.querySelector(".two-matrix .det .result p");

twoDetBtn.addEventListener("click", () => {
	var values = document.querySelectorAll(".two-matrix .det input");
	var a = eval(values[0].value);
	var b = eval(values[1].value);
	var c = eval(values[2].value);
	var d = eval(values[3].value);
	var det = a * d - b * c;
	resultText.textContent = `The determinant of the matrix ${det}`;
	if (result.classList.contains("hide")) {
		findDet.classList.add("hide");
		result.classList.remove("hide");
	}
});

twoDetBack.addEventListener("click", () => {
	if (findDet.classList.contains("hide")) {
		findDet.classList.remove("hide");
		result.classList.add("hide");
	}
});

/* Two by Two matrix operation */

var twoOperBtn = document.querySelector(".two-matrix .oper .buttons");
var twoOperBack = document.querySelector(".two-matrix .oper-result button");
var doOper = document.querySelector(".two-matrix .oper .do-oper");
var operResult = document.querySelector(".two-matrix .oper .oper-result");

twoOperBtn.addEventListener("click", e => {
	if (operResult.classList.contains("hide")) {
		doOper.classList.add("hide");
		operResult.classList.remove("hide");
	}
	var values = document.querySelectorAll(".two-matrix .oper input");
	var a = eval(values[0].value);
	var b = eval(values[1].value);
	var c = eval(values[2].value);
	var d = eval(values[3].value);
	var e = eval(values[4].value);
	var f = eval(values[5].value);
	var g = eval(values[6].value);
	var h = eval(values[7].value);
	if (e.target.classList.contains("add")) {
		var m = a + e;
		var n = b + f;
		var o = c + g;
		var p = d + h;
		console.log(g);
	} else if (e.target.classList.contains("subtract")) {
		var det = b;
		console.log(det);
	} else if (e.target.classList.contains("multiply")) {
		var det = d;
		console.log(det);
	}
});

twoOperBack.addEventListener("click", () => {
	if (doOper.classList.contains("hide")) {
		doOper.classList.remove("hide");
		operResult.classList.add("hide");
	}
});
