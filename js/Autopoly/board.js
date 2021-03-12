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

    initPrefabs(getRow(0));

    for (let i = 0; i < getRows().length; i++) {
        let row = getRow(i);
        createTiles(row, i);
    }
    for (const prefab of tilePrefabs) {
        prefab.style.display = "none";
    }
    initPieces();
    createPieces();
}

function initPrefabs(firstRow) {
    tilePrefabs[0] = firstRow.getElementsByClassName('property')[0];
    tilePrefabs[1] = firstRow.getElementsByClassName('chance')[0];
    tilePrefabs[2] = firstRow.getElementsByClassName('chest')[0];
    tilePrefabs[3] = firstRow.getElementsByClassName('utility')[0];
    tilePrefabs[4] = firstRow.getElementsByClassName('tax')[0];
    tilePrefabs[5] = firstRow.getElementsByClassName('railroad')[0];
}

/*function createCards() {
    let board = body.getElementsByTagName('board')[0];
    //let chancePile = 
}*/

function createTiles(row, rowIndex) {
    let normRowIndex = rowIndex * (tilesPerSide + 1);

    tiles[normRowIndex] = row.getElementsByTagName('corner')[0];

    for (let i = 0; i < tilesPerSide; i++) {
        let tileIndex = normRowIndex + i + 1;
        let tileElement = createTile(tileIndex);
        let leftMod = (tilesPerSide + 1) - i;
        let tileLeft = tileLeftPrefix + leftMod + tileLeftSuffix;
        tileElement.style.left = tileLeft;

        tiles[tileIndex] = tileElement;

        row.appendChild(tileElement);
    }
}

function createTile(tileIndex) {
    let typeIndex = getTypeIndex(tileIndex);
    let prefab = tilePrefabs[typeIndex - 1];
    let tile = prefab.cloneNode(true);
    if (typeIndex === 0) {

    }
    if (typeIndex === 1) {
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

function getRows() {
    let rows = document.body.getElementsByTagName('row');
    return rows;
}

function getRow(rowIndex) {
    let row = getRows()[rowIndex];
    return row;
}

function getTile(tileIndex) {
    let rowIndex = Math.floor(tileIndex / 4);
    let row = getRow(rowIndex);
    if (tileIndex % 10 === 0) {
        let corner = row.getElementsByTagName('corner')[0];
        return corner;
    }
    let tiles = Array.from(row.getElementsByTagName('tile'));
    tiles = removeByComputedStyle(tiles, 'display', 'none');
    let normTileIndex = tileIndex % 10 - 1;
    let tile = tiles[normTileIndex];
    return tile;
}

function getTypeIndex(tileIndex) {
    if (tileIndex % 10 === 0) {
        return 0;
    }
    let specialIndices = classic.specialIndices;
    for (let typeIndex = 0; typeIndex < specialIndices.length; typeIndex++) {
        let indices = specialIndices[typeIndex];
        for (let subTypeIndex = 0; subTypeIndex < indices.length; subTypeIndex++) {
            let index = indices[subTypeIndex];
            if (tileIndex === index) {
                return typeIndex + 2;
            }
        }
    }
    return 1;
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