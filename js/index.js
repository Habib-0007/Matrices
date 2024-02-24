/* Two by Two Matrix */

var twoDetBtn = document.querySelector(".two-matrix .det .btn");
var twoDetBack = document.querySelector(".two-matrix .det .result button");
var findDet = document.querySelector(".two-matrix .det .find-det");
var result = document.querySelector(".two-matrix .det .result");

twoDetBtn.addEventListener("click", () => {
	var values = document.querySelectorAll(".two-matrix .det input");
	var a = eval(values[0].value);
	var b = eval(values[1].value);
	var c = eval(values[2].value);
	var d = eval(values[3].value);
	var det = a * d - b * c;
	console.log(det);
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
