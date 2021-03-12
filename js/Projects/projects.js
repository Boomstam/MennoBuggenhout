const defaultWidth = 30;
const maxWidthOffset = 10;
const widthUnit = "vw";
const numColumns = 3;
var defaultName;

setUpGallery();

function setUpGallery() {
    //randomColumnWidth();
    insertArticles();
}

/*function randomColumnWidth() {
    let cols = document.body.getElementsByTagName('columns')[0];
    let col = cols.children[0];
    for (let i = 0; i < numColumns - 1; i++) {
        let copy = col.cloneNode(true);
        cols.appendChild(copy);
    }
    let offset1 = nextOffset();
    let offset2 = nextOffset();
    cols.children[0].style.width = (defaultWidth + offset1) + widthUnit;
    cols.children[2].style.width = (defaultWidth + offset2) + widthUnit;
    cols.children[1].style.width = (defaultWidth - offset1 - offset2) + widthUnit;
    defaultName = col.getElementsByTagName('h3')[0].innerHTML;
    console.log(defaultName);
}

function nextOffset() {
    let offset = randomIntInRange(-maxWidthOffset, maxWidthOffset);;
    return offset;
}*/

async function insertArticles() {
    await waitForTextLoader();
    let articles = await getArticles();
    let size = articles.length;
    while (size > 0) {
        let randomIndex = randomIntInRange(0, size - 1);
        let article = articles.splice(randomIndex, 1);
        size = articles.length;
        insertArticle(article[0]);
    }
    deleteTemplateArticle();
}

function deleteTemplateArticle(){
    let templArt = document.body.getElementsByTagName('article')[0];
    templArt.remove();
}

function insertArticle(article) {
    console.log(article);
    //let column = colWithMinNumChildren();
    let gallery = document.body.getElementsByTagName('project-gallery')[0];
    let articleElement = gallery.children[0];
    let nameToCheck = articleElement.getElementsByTagName('h3')[0];
    console.log(nameToCheck.innerHTML);
    console.log(defaultName);
    let isFilled = (nameToCheck.innerHTML !== defaultName);
    if (isFilled) {
        let copy = articleElement.cloneNode(true);
        gallery.appendChild(copy);
        articleElement = copy;
    }
    let img = articleElement.getElementsByTagName('img')[0];
    let name = articleElement.getElementsByTagName('h3')[0];
    let description = articleElement.getElementsByTagName('p')[0];
    let link = articleElement.getElementsByTagName('a')[0];
    img.src = 'images/projects/' + article.id + '.jpg';
    name.innerHTML = article.name;
    description.innerHTML = article.description;
    link.href = article.links;;
}

/*function colWithMinNumChildren() {
    let cols = document.body.getElementsByTagName('columns')[0];
    let colIndex;
    let lowestSize = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < numColumns; i++) {
        let col = cols.children[i];
        let size = col.childElementCount;
        if (size < lowestSize) {
            lowestSize = size;
            colIndex = i;
        }
    }
    let column = cols.children[colIndex];
    return column;
}*/