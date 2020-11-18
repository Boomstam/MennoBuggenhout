const pieceImgPrefix = 'images/piece';
const pieceImgSuffix = '.png';
var numPieces = 8;
var examplePiece;
var pieces = [];
var start;

function initPieces() {
    start = document.body.getElementsByClassName('bottomRow')[0].getElementsByTagName('corner')[0];
    examplePiece = start.getElementsByTagName('piece')[0];
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
    setImage(piece, pieceIndex);
    /*putPieceOnTile(piece, start, true);
    putPieceOnTile(piece, start, true);*/
    let tile = document.body.getElementsByClassName('bottomRow')[0].getElementsByTagName('tile')[0];
    putPieceOnTile(piece, tile, false);
    pieces[pieceIndex] = piece;
}

function putPieceOnTile(piece, tile, isCorner) {
    let positions = classic.tilePiecePositions;
    console.log('positions' + positions);
    if (isCorner) {
        positions = classic.cornerPiecePositions;
    }
    let numPieces = numPiecesOnTile(tile);
    console.log('numpieces' + numPieces);
    let position = positions[numPieces];
    HIER
    console.log('position' + position);
    tile.appendChild(piece);
    piece.style.left = position[0] + '%';
    piece.style.top = position[1] + '%';
}

function setImage(piece, pieceIndex) {
    pieceIndex = pieceIndex + 1;
    let img = piece.getElementsByTagName('img')[0];
    img.src = pieceImgPrefix + pieceIndex + pieceImgSuffix;
}

function isCorner(tile) {
    return tile.tagName = 'CORNER';
}

function numPiecesOnTile(tile) {
    return piecesOnTile(tile).length;
}

function piecesOnTile(tile) {
    return pieces = tile.getElementsByTagName('piece');
}