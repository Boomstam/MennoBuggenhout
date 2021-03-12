const pieceImgPrefix = 'images/monopoly/piece';
const pieceImgSuffix = '.png';
var numPieces = 8;
var examplePiece;
var pieces = [];

function initPieces() {
    let go = getTile(0);
    examplePiece = go.getElementsByTagName('piece')[0];
    examplePiece.style.display = "none";
}

function createPieces() {
    for (let i = 0; i < numPieces; i++) {
        createPiece(i);
    }
}

function createPiece(pieceIndex) {
    let piece = examplePiece.cloneNode(true);
    piece.style.display = "block";
    piece.className = "livePiece";
    setImage(piece, pieceIndex);
    let tile = getTile(1);
    putPieceOnTile(piece, tile);
    pieces[pieceIndex] = piece;
}

function putPieceOnTile(piece, tile) {
    let isCorner = checkIfCorner(tile);
    let positions = classic.tilePiecePositions;
    if (isCorner) {
        positions = classic.cornerPiecePositions;
    }
    let positionIndex = numPiecesOnTile(tile);
    let position = positions[positionIndex];
    tile.appendChild(piece);
    piece.style.left = position[0] + '%';
    piece.style.top = position[1] + '%';
}

function setImage(piece, pieceIndex) {
    pieceIndex = pieceIndex + 1;
    let img = piece.getElementsByTagName('img')[0];
    img.src = pieceImgPrefix + pieceIndex + pieceImgSuffix;
}

function checkIfCorner(tile) {
    return tile.tagName === 'CORNER';
}

function numPiecesOnTile(tile) {
    return piecesOnTile(tile).length;
}

function piecesOnTile(tile) {
    let pieces = tile.getElementsByTagName('piece');
    //https://stackoverflow.com/questions/37311003/how-to-remove-an-item-from-htmlcollection
    pieces = Array.from(pieces);
    pieces = removeByProp(pieces, 'className', 'exampleTile');
    return pieces;
}

function getPieceTileIndex(piece) {

}