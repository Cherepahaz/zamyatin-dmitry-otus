const { createReadStream, createWriteStream } = require('fs');
const { Transform } = require('stream');

const inputFilePath = process.argv[2]; // Входной файл
const outputFilePath = process.argv[3]; // Выходной файл (Можно переделать на константу)

// Создаем поток для чтения из файла
const readStream = createReadStream(inputFilePath, { encoding: 'utf8' });

// Создаем поток для записи в файл
const writeStream = createWriteStream(outputFilePath, { encoding: 'utf8' });

// Трансформирующий поток для разделения на слова и фильтрации символов
const wordTransform = new Transform({
    readableObjectMode: true,
    writableObjectMode: true,

    transform(chunk, encoding, callback) {
        const words = chunk.split(/\s+/);
        const filteredWords = words.map(word => word.replace(/[^а-яА-Яa-zA-Z]/g, '').toLowerCase());
        this.push(filteredWords);
        callback();
    }
});

// Трансформирующий поток для индексации и подсчета слов
const indexTransform = new Transform({
    readableObjectMode: true,
    writableObjectMode: true,
    wordIndex: {},

    transform(chunk, encoding, callback) {
        this.wordIndex = this.wordIndex || {}; // Проверяем и создаем объект, если он еще не определен
        chunk.forEach(word => {
            this.wordIndex[word] = (this.wordIndex[word] || 0) + 1;
        });
        callback();
    },

    flush(callback) {
        const sortedWords = Object.keys(this.wordIndex).sort();
        const vector = sortedWords.map(word => this.wordIndex[word]);
        this.push(JSON.stringify(vector));
        callback();
    }
});

// Подключаем потоки
readStream
    .pipe(wordTransform)
    .pipe(indexTransform)
    .pipe(writeStream)
    .on('finish', () => console.log('Успешный успех!'));


// Обработчик ошибок для потока чтения
readStream.on('error', (error) => {
    console.error('Ошибка чтения файла:', error);
});

// Обработчик ошибок для трансформирующего потока indexTransform
indexTransform.on('error', (error) => {
    console.error('Ошибка в indexTransform:', error);
});

// Обработчик ошибок для потока записи
writeStream.on('error', (error) => {
    console.error('Ошибка записи в файл:', error);
});
