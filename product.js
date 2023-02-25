// 3. Создать класс данных "Товар"
// С полями
// Название
// Цена
// Количество
// Описание
// Наполнить массив объектами такого класса.
// Написать метод, который получает строку вида
// "name-contains-fd&price-=2&quantity->5&description-ends-abc"
// "name-starts-fd&quantity-=5"
// На выходе возвращает массив, только с подходящими объектами
// возможны (contains, starts, ends для строковых и <, =, >, <=, >= для числовых)

class Product {
	constructor(name, price, quantity, description) {
		this.name = name;
		this.price = price;
		this.quantity = quantity;
		this.description = description;
	}

	_predicates = {
		contains: (prop, substr) => this[prop].includes(substr),
		starts: (prop, substr) => this[prop].startsWith(substr),
		ends: (prop, substr) => this[prop].endsWith(substr),
		'=': (prop, num) => this[prop] === +num,
		'>': (prop, num) => this[prop] > +num,
		'<': (prop, num) => this[prop] < +num,
		'>=': (prop, num) => this[prop] >= +num,
		'<=': (prop, num) => this[prop] <= +num,
	};

	get predicates() {
		return this._predicates;
	}

	static filter(products, query) {
		const conditions = query.split('&');
		let filtered = [...products];

		for (let condition of conditions) {
			filtered = filtered.filter(Product.parsePredicate(condition));
		}

		return filtered;
	}

	static parsePredicate(condition) {
		const cond = condition.split('-');

		if (cond.length === 3) {
			const [prop, op, substr] = cond;

			return (product) => product.predicates[op](prop, substr);
		} else {
			const [prop, comparison] = cond;
			const [num] = comparison.match(/\d+/); // извлекаем число из операции сравнения
			// если нужна обработка не целых или отрицательных чисел
			// const [num] = comparison.match(/[+-]?(\d*[.])?\d+/);
			const op = comparison.replace(num, ''); // отделяем число от оператора сравнения

			return (product) => product.predicates[op](prop, num);
		}
	}
}

const products = [
	new Product('Afder', 2, 12, 'fsabc'),
	new Product('etq', 2, 52, 'hwyabc'),
	new Product('fdq', 6, 5, 'trabc'),
	new Product('fdq', 51, 52, 'fasabc'),
	new Product('etq', 67, 5, 'fasabc'),
	new Product('fd', 744, 5, 'fasabc'),
	new Product('etq', 167, 52, 'fasabc'),
];

const filtered1 = Product.filter(
	products,
	'name-contains-fd&price-=2&quantity->5&description-ends-abc'
);
filtered1.forEach((p) => console.log(p));
// new Product('Afder', 2, 12, 'fsabc'),

const filtered2 = Product.filter(products, 'name-starts-fd&quantity-=5');
filtered2.forEach((p) => console.log(p));
// new Product('fdq', 6, 5, 'trabc'),
// new Product('fd', 744, 5, 'fasabc'),
