function removeByProp(array, propName, value) {
    let maxIndex = array.length - 1;
    for (let i = maxIndex; i >= 0; i--) {
        let element = array[i];
        if (element[propName] === value) {
            array.splice(i, 1);
        }
    }
    return array;
}

function removeByPropProp(array, propName1, propName2, value) {
    let maxIndex = array.length - 1;
    for (let i = maxIndex; i >= 0; i--) {
        let element = array[i];
        if (element[propName1][propName2] === value) {
            array.splice(i, 1);
        }
    }
    return array;
}

function removeByComputedStyle(array, propName, value) {
    let maxIndex = array.length - 1;
    for (let i = maxIndex; i >= 0; i--) {
        let element = array[i];
        let style = window.getComputedStyle(element);
        if (style[propName] === value) {
            array.splice(i, 1);
        }
    }
    return array;
}

function getByProp(array, propName, value) {
    let results = [];
    for (const element of array) {
        if (element[propName] === value) {
            results.push(element);
        }
    }
    return results;
}