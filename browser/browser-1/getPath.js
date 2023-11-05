function getPath(element) {
    const selectors = []; // Создаем пустой массив для хранения селекторов

    while (element && element.nodeType === Node.ELEMENT_NODE) { // Пока существует элемент и это элемент типа ELEMENT_NODE
        let selector = element.nodeName.toLowerCase(); // Получаем имя тега элемента в нижнем регистре

        if (element.id) { // Если у элемента есть id
            selectors.unshift(`#${element.id}`); // Добавляем селектор с id в начало массива
            break; // Прерываем цикл
        } else { // В противном случае
            let sibling = element; // Задаем sibling текущим элементом
            let index = 1; // Задаем индекс 1

            while ((sibling = sibling.previousElementSibling) !== null) { // Пока существует предыдущий элемент
                if (sibling.nodeName.toLowerCase() === selector) { // Если имя тега предыдущего элемента совпадает с текущим
                    index++; // Увеличиваем индекс
                }
            }

            if (index > 1) { // Если индекс больше 1
                selector += `:nth-of-type(${index})`; // Добавляем псевдокласс nth-of-type с индексом к селектору
            }

            selectors.unshift(selector); // Добавляем селектор в начало массива
            element = element.parentNode; // Переходим к родительскому элементу
        }
    }

    return selectors.join(' > '); // Объединяем селекторы в строку с разделителем ">"
}