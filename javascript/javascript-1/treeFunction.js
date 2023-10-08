let tree = {
    "name": 1,
    "items": [{
        "name": 2,
        "items": [{ "name": 3 }, { "name": 4 }]
    }, {
        "name": 5,
        "items": [{ "name": 6 }]
    }]
};

function getSсhema(obj, plate = 1) {
    for (let key in obj) {
        if (typeof obj[key] == "number") {
            console.log(plate > 1 ? (plate == 2 ? "├───" + obj[key] : "│" + " ".repeat(plate - 2) + "└───" + obj[key]) : obj[key]);
        } else {
            if (obj["items"]) {
                plate += 1;
                for (let key in obj["items"]) {
                    getSсhema(obj["items"][key], plate);
                }
            }
        }
    }
}

getSсhema(tree);
