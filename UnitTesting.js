"use strict";

function assert(funcRes, expRes){
	try {
		if (funcRes !== expRes)
			throw(new Error());
	}catch(e){
		console.log("----------------------------------------------------------");
		console.log(e.stack);
		console.log("Ожидаемое значение функции - "+ expRes);
		console.log("Полученное значение функции - "+ funcRes);
		console.log("----------------------------------------------------------");
	}
}