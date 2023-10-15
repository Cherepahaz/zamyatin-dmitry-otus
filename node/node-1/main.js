const fs = require('fs');
const path = require('path');
//Перебираю дериктории и собираю объект для дальнейшего вывода
function tree(dirPath, depth, currentDepth = 0) {
    if (currentDepth > depth) return null;

    const items = fs.readdirSync(dirPath, { withFileTypes: true });

    const result = { name: path.basename(dirPath) };
    result.items = items.reduce((acc, item) => {
        if (item.isDirectory()) {
            const newItem = tree(path.join(dirPath, item.name), depth, currentDepth + 1);
            if (newItem) {
                acc.push(newItem);
            }
        } else {
            acc.push({ name: item.name });
        }
        return acc;
    }, []);

    return result;
}

//переписал функцию из первого Дз. изначально функция была не универсальной
function treeFunction(obj, plate = 1) {
    console.log(plate > 1 ? (plate == 2 ? "├───" + obj.name : "│" + " ".repeat(plate - 2) + "└───" + obj.name) : obj.name);
    if (obj.items) {
        obj.items.forEach(element => {
            treeFunction(element, plate + 1)
        });
    } else {
        return
    }
}

function main() {
    const args = process.argv.slice(2);
    const dirPath = args[0];
    const depthFlagIndex = args.indexOf('-d') !== -1 ? args.indexOf('-d') : args.indexOf('--depth');
    const depth = depthFlagIndex !== -1 && args[depthFlagIndex + 1] ? Number(args[depthFlagIndex + 1]) : Infinity;
    const treeResult = tree(dirPath, depth);
    treeFunction(treeResult);
}

main();