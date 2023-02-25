// 1.1. Преобразование строки к нижнему регистру, но первая буква большая. "Abscd"

function capitalize(word) {
	if (!word) return word;

	return word[0].toUpperCase() + word.slice(1);
}

// 1.2. Преобразование строки с целью правильно расстановки пробелов.
// "Вот пример строки,в которой     используются знаки препинания.После знаков должны стоять пробелы ,
// а перед знаками их быть не должно .    Если есть лишние подряд идущие пробелы, они должны быть устранены." =>
// "Вот пример строки, в которой используются знаки препинания. После знаков должны стоять пробелы,
// а перед знаками их быть не должно. Если есть лишние подряд идущие пробелы, они должны быть устранены."

//можно легко поменять, чтобы можно было получать punctuationMarks динамически
function formatSpaces(sentence) {
	const punctuationMarks = [",", ".", "!", "?"];
	const markPattern = new RegExp(` *[${punctuationMarks.join("")}] *`, "g");
	return sentence
		.replace(markPattern, (mark) => mark.trim() + " ")
		.replace(/ +/g, " ");
}
// короткий вариант
function shortFormatSpaces(sentence) {
	return sentence
		.replace(/ *[,.!?] */g, (mark) => mark.trim() + " ")
		.replace(/ +/g, " ");
}

// 1.3. Подсчитывающие кол-во слов в строке.

function countWords(sentence) {
	if (!sentence) return 0;

	return sentence.split(" ").length;
}

// 1.4. Подсчитывающий, уникальные слова. "Текст, в котором слово текст несколько
// раз встречается и слово тоже" - в ответе, что "слово - 2 раза, текст - 2 раза,
// в - 1 раз, несколько - 1 раз". Самостоятельно придумать наиболее удачную структуру данных для ответа.

function countUniqueWords(sentence) {
	if (!sentence) return "";

	sentence = sentence.toLowerCase();

	const wordsMap = {};
	const words = sentence.matchAll(/[а-яА-Яa-zA-Z]+/gi);

	for (let [word] of words) {
		if (!wordsMap[word]) {
			wordsMap[word] = 1;
		} else {
			wordsMap[word]++;
		}
	}
	return Object.entries(wordsMap)
		.map(([word, count]) => `${word} - ${count} ${calcTimes(count)}`)
		.join(", ");
}

function calcTimes(count) {
	if (count < 0)
		throw new Error("Invalid argument: count must be non negative");
	count %= 100;
	if (count >= 5 && count <= 20) return "раз";

	count %= 10;
	if (count < 2) return "раз";
	if (count < 5) return "раза";

	return "раз";
}
