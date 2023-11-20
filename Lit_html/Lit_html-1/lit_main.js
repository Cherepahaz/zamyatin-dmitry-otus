import { LitElement, html, css } from 'https://cdn.skypack.dev/lit?min';

// Определяем класс MyTree
class MyTree extends LitElement {
    static get properties() {
        return {
            data: { type: Object }
        };
    }

    // Конструктор класса
    constructor() {
        super(); // Вызов конструктора родительского класса
        // Инициализация свойства data объектом, описывающим дерево
        this.data = {
            "name": "Tree",
            "items": [
                {
                    "name": "Папка 1 уровня",
                    "items": [
                        {
                            "name": "Папка в 1 уровне",
                            "items": [
                                {
                                    "name": "Файл 1 в папке 1 уровня.txt"
                                }
                            ]
                        },
                        {
                            "name": "Файл в 1 уровне_1.txt"
                        },
                        {
                            "name": "Файл в 1 уровне_2.txt"
                        }
                    ]
                },
                {
                    "name": "Папка 2 уровня",
                    "items": [
                        {
                            "name": "Файл в 2 уровне.txt"
                        }
                    ]
                },
                {
                    "name": "Папка 3 уровня",
                    "items": [
                        {
                            "name": "Файл в 3 уровне.txt"
                        }
                    ]
                },
                {
                    "name": "Папка с системным файлом",
                    "items": [
                        {
                            "name": ".gitignore"
                        }
                    ]
                },
                {
                    "name": "Пустая папка",
                    "items": []
                },
                {
                    "name": "Файл в корне.txt"
                }
            ]
        };
    }

    // Метод render для отображения дерева
    render() {
        //Отображаем каждый элемент дерева с помощью my-leaf
        return html`
            <ul>
                ${this.data.items.map(item => html`
                    <my-leaf .data=${item}></my-leaf>
                `)}
            </ul>
        `;
    }
}

// Регистрируем компонент my-tree
customElements.define('my-tree', MyTree);

// Определяем класс MyLeaf
class MyLeaf extends LitElement {
    static get properties() {
        return {
            data: { type: Object }
        };
    }

    render() {
        //Выводим имя текущего узла
        //Проверяем наличие дочерних элементов и рекурсивно отображаем их
        return html`
            <li>
                ${this.data.name}
                ${this.data.items ? html`
                    <my-tree .data=${this.data}></my-tree>
                ` : ''}
            </li>
        `;
    }
}

customElements.define('my-leaf', MyLeaf);
