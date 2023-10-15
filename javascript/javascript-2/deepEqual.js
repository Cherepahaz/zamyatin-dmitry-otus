function deepEqual(actual, expected, path = '$') {
    // Функция для генерации пути с ошибкой
    function genErrorPath(path, prop) {
        return path === '$' ? `$${prop}` : `${path}.${prop}`;
    }

    // Функция для сравнения двух значений
    function compareValues(a, b, currentPath) {
        if (typeof a !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
            console.error(`Значения по пути ${currentPath} не идентичны:`, a, b);
            return false;
        }

        if (typeof a === 'object' && a !== null && b !== null) {
            return deepEqual(a, b, currentPath);
        }

        if (a !== b) {
            console.error(`Значения по пути ${currentPath} не идентичны:`, a, b);
            return false;
        }

        return true;
    }

    // Перебираем свойства объектов actual и expected
    for (let prop in actual) {
        const currentPath = genErrorPath(path, prop);

        if (!expected.hasOwnProperty(prop)) {
            console.error(`Свойство ${currentPath} не найдено в ожидаемом объекте`);
            return false;
        }

        if (!compareValues(actual[prop], expected[prop], currentPath)) {
            return false;
        }
    }

    // Проверяем, что в объекте expected нет лишних свойств
    for (let prop in expected) {
        const currentPath = genErrorPath(path, prop);

        if (!actual.hasOwnProperty(prop)) {
            console.error(`Свойство ${currentPath} не найдено в ожидаемом объекте`);
            return false;
        }
    }

    return 'ОК';
}

const obj1 = {
    a: {
        b: 1,
    },
};
const obj2 = {
    a: {
        b: 2,
    },
};
const obj3 = {
    a: {
        b: 1,
    },
};
console.log(deepEqual(obj1, obj1));
// OK
console.log(deepEqual(obj1, obj2));
// Error: a.b
console.log(deepEqual(obj1, obj3));
// OK