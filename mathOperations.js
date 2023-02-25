// 2.Написать модуль, который способен выполнять операции с числами любой длины.
// 4 метода для сложения, умножения, вычитания и деления.

// чтобы выполнять операции с числами любой длины, a и b должны быть типа string
// функции принимают только целые числа
// divide осуществляет деление нацело

function add(a, b) {
	if (a[0] === '-' && b[0] === '-') return '-' + add(a.slice(1), b.slice(1));

	if (a[0] === '-') return subtract(b, a.slice(1));

	if (b[0] === '-') return subtract(a, b.slice(1));

	const aDigits = a.split('').reverse().map((d) => +d);
	const bDigits = b.split('').reverse().map((d) => +d);

	const length = Math.max(aDigits.length, bDigits.length);

	const digitsSum = new Array(length);
	let carry = 0;

	for (let i = 0; i < length; i++) {
		let digitA = aDigits[i] ?? 0;
		let digitB = bDigits[i] ?? 0;

		let sum = digitA + digitB + carry;
		carry = Math.floor(sum / 10);

		digitsSum[i] = sum % 10;
	}

	if (carry !== 0) {
		return carry + digitsSum.reverse().join('');
	}
	return digitsSum.reverse().join('');
}

function subtract(a, b) {
	if (a[0] === '-' && b[0] === '-') return subtract(b.slice(1), a.slice(1));

	if (a[0] === '-') return '-' + add(a.slice(1), b);

	if (b[0] === '-') return add(a, b.slice(1));

	if (isSmaller(a, b)) {
		return '-' + subtract(b, a);
	}

	const aDigits = a.split('').reverse().map((d) => +d);
	const bDigits = b.split('').reverse().map((d) => +d);

	const length = Math.max(aDigits.length, bDigits.length);
	let subDigits = [];
	let carry = 0;

	for (let i = 0; i < length; i++) {
		let digitA = aDigits[i] ?? 0;
		let digitB = bDigits[i] ?? 0;

		let difference = digitA - digitB + carry;

		if (difference < 0) {
			carry = -1;
			difference += 10;
		} else {
			carry = 0;
		}
		subDigits.push(difference);
	}

	subDigits = subDigits.reverse();

	while (subDigits[0] === 0) subDigits.shift();

	return subDigits.length === 0 ? '0' : subDigits.join('');
}

function multiply(a, b) {
	if (a === '0' || b === '0') return '0';

	let sign;
	[a, b, sign] = handleMinusSign(a, b);

	const aLength = a.length;
	const bLength = b.length;
	const mult = new Array(aLength + bLength).fill(0);

	for (let i = aLength - 1; i >= 0; i--) {
		for (let j = bLength - 1; j >= 0; j--) {
			const current = i + j + 1;
			const next = i + j;

			let sum = mult[current] + a[i] * b[j];
			mult[current] = sum % 10;
			mult[next] += Math.floor(sum / 10);
		}
	}

	while (mult[0] === 0) mult.shift();

	return sign + mult.join('');
}

function divide(a, b) {
	let sign;
	[a, b, sign] = handleMinusSign(a, b);

	if (b === '0') throw new Error('Division by zero');

	let carry = a;
	let order = carry.length - b.length - 1;
	let divider = b + '0'.repeat(order < 0 ? 0 : order);
	let count = '0';

	while (true) {
		count = add(count, '1' + '0'.repeat(order < 0 ? 0 : order));
		carry = subtract(carry, divider);

		if (carry[0] === '-') {
			count = subtract(count, '1' + '0'.repeat(order < 0 ? 0 : order));
			carry = subtract(divider, carry.slice(1));

			order = carry.length - b.length - 1;
			divider = b + '0'.repeat(order < 0 ? 0 : order);

			if (order < -1 || isSmaller(carry, divider))
				return count === '0' ? '0' : sign + count;
		}
	}
}

function handleMinusSign(a, b) {
	let sign = '';
	if (a[0] === '-' && b[0] === '-') {
		a = a.slice(1);
		b = b.slice(1);
	} else if (a[0] === '-') {
		sign = '-';
		a = a.slice(1);
	} else if (b[0] === '-') {
		sign = '-';
		b = b.slice(1);
	}
	return [a, b, sign];
}

function isSmaller(str1, str2) {
	let n1 = str1.length;
	let n2 = str2.length;

	if (n1 !== n2) return n1 < n2;

	for (let i = 0; i < n1; i++) {
		if (str1[i] === str2[i]) continue;

		if (str1[i].charCodeAt(0) < str2[i].charCodeAt(0)) return true;

		return false;
	}
	return false;
}
