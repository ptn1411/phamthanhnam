function sum_to_n_a(num) {
	let result = 0;
	for (let i = 1; i <= num; i++) {
		result = result + i;
	}
	return result;
}

function sum_to_n_b(num) {
	return (num * (num + 1)) / 2;
}

function sum_to_n_c(num) {
	if (num <= 1) {
		return num;
	}
	return num + sum_to_n_c(num - 1);
}
console.log("sum_to_n_a: ", sum_to_n_a(5));
console.log("sum_to_n_b: ", sum_to_n_b(5));
console.log("sum_to_n_c: ", sum_to_n_c(5));
