const rotPrefix = 'rotate(';
const rotSuffix = 'deg)';
const rightAngle = 90;
const numSides = 4;
const tilesPerSide = 9;
const tileLeftPrefix = "calc(var(--tileWidth) * ";
const tileLeftSuffix = ")";
const tilePrefabs = [];
const tiles = [];
var classic;

createBoard();

async function createBoard() {
    await waitForTextLoader();
    classic = getClassic();

    let rows = document.body.getElementsByTagName('row');

    initPrefabs(rows[0]);

    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        createTiles(row, i);
    }
    console.log('create pieces');
    initPieces();
    createPieces();
    for (const prefab of tilePrefabs) {
        prefab.style.display = "none";
    }
}

function initPrefabs(firstRow) {
    tilePrefabs[0] = firstRow.getElementsByClassName('property')[0];
    tilePrefabs[1] = firstRow.getElementsByClassName('chance')[0];
    tilePrefabs[2] = firstRow.getElementsByClassName('chest')[0];
    tilePrefabs[3] = firstRow.getElementsByClassName('utility')[0];
    tilePrefabs[4] = firstRow.getElementsByClassName('tax')[0];
    tilePrefabs[5] = firstRow.getElementsByClassName('railroad')[0];
}

function createTiles(row, rowIndex) {
    let normRowIndex = rowIndex * (tilesPerSide + 1);

    tiles[normRowIndex] = row.getElementsByTagName('corner')[0];

    for (let i = 0; i < tilesPerSide; i++) {
        let tileIndex = normRowIndex + i + 1;
        let tileElement = getTile(tileIndex);
        let leftMod = (tilesPerSide + 1) - i;
        let tileLeft = tileLeftPrefix + leftMod + tileLeftSuffix;
        tileElement.style.left = tileLeft;

        tiles[tileIndex] = tileElement;

        row.appendChild(tileElement);
    }
}

function getTile(tileIndex) {
    let typeIndex = getTypeIndex(tileIndex);
    let prefab = tilePrefabs[typeIndex];
    let tile = prefab.cloneNode(true);

    if (typeIndex === 0) {
        let propertyIndex = getPropertyIndex(tileIndex);
        let tileName = getPropertyName(propertyIndex, true);
        let tilePrice = getPropertyPrice(propertyIndex);
        let familyIndex = getPropertyFamily(propertyIndex);
        let color = 'var(--property' + familyIndex + ')';

        tile.getElementsByTagName('tilecolor')[0].style.backgroundColor = color;
        tile.getElementsByTagName('tilename')[0].innerHTML = tileName.toUpperCase();
        tile.getElementsByTagName('tileprice')[0].innerHTML = "M" + tilePrice;
        return tile;
    }
    if (typeIndex === 1) {

    }
    if (typeIndex === 2) {

    }
    if (typeIndex === 3) {

    }
    if (typeIndex === 4) {

    }
    if (typeIndex === 5) {

    }
    return tile;
}

function getPropertyFamily(propertyIndex) {
    let count = 0;
    for (let i = 0; i < classic.properties.length; i++) {
        let family = classic.properties[i];
        count = count + family.length;
        if (propertyIndex >= count) {
            continue;
        } else {
            return i;
        }
    }
    throw 'property family not found for ' + propertyIndex;
}

function getTypeIndex(tileIndex) {
    let specialIndices = classic.specialIndices;
    for (let typeIndex = 0; typeIndex < specialIndices.length; typeIndex++) {
        let indices = specialIndices[typeIndex];
        for (let subTypeIndex = 0; subTypeIndex < indices.length; subTypeIndex++) {
            let index = indices[subTypeIndex];
            if (tileIndex === index) {
                return typeIndex + 1;
            }
        }
    }
    return 0;
}

function getPropertyIndex(tileIndex) {
    let specialIndices = classic.specialIndices;
    let offset = 0;
    for (const indices of specialIndices) {
        for (const index of indices) {
            if (tileIndex < index) {
                break;
            } else {
                offset++;
            }
        }
    }
    let rowOffset = Math.ceil(tileIndex / 10);
    let propertyIndex = tileIndex - offset - rowOffset;
    return propertyIndex;
}

function getPropertyName(propertyIndex, display) {
    if (display) {
        if (propertyIndex === 0) {
            return "mediter- ranean avenue";
        }
    }
    let count = 0;
    for (let i = 0; i < classic.properties.length; i++) {
        let family = classic.properties[i];
        for (let nameIndex = 0; nameIndex < family.length; nameIndex++) {
            let propertyName = family[nameIndex];
            if (propertyIndex === count) {
                return propertyName;
            }
            count++;
        }
    }
}

function getPropertyPrice(propertyIndex) {
    let count = 0;
    for (let i = 0; i < classic.propertyPrices.length; i++) {
        let family = classic.propertyPrices[i];
        for (let nameIndex = 0; nameIndex < family.length; nameIndex++) {
            let propertyPrice = family[nameIndex];
            if (propertyIndex === count) {
                return propertyPrice;
            }
            count++;
        }
    }
}