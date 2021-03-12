const numActiveSparks = 8;
const timeRange = { min: 200, max: 1500 };
const sizeRange = { min: 10, max: 30 };
const numSparkInstances = 3;
var sparkPool = [];

setUpSparkAnimation();

function setUpSparkAnimation() {
    setUpPool();
    startAnimation();
}

function setUpPool() {
    let sparks = document.body.getElementsByTagName('sparks')[0];
    let sparkColl = sparks.getElementsByTagName('spark');
    let instances = [];
    for (let sparkIndex = 0; sparkIndex < sparkColl.length; sparkIndex++) {
        let spark = sparkColl[sparkIndex];
        spark.style.display = 'none';
        sparkPool[sparkIndex] = [numSparkInstances];
        for (let instanceIndex = 0; instanceIndex < numSparkInstances; instanceIndex++) {
            let instance = spark.cloneNode(true);
            instances.push(instance);
            sparkPool[sparkIndex][instanceIndex] = instance;
        }
    }
    for (const instance of instances) {
        sparks.appendChild(instance);
    }
}

function startAnimation() {
    for (let i = 0; i < numActiveSparks; i++) {
        nextSpark();
    }
}

function nextSpark() {
    let sparkIndex = nextSparkIndex();
    let spark = nextFromPool(sparkIndex);
    let size = nextSparkSize();
    let location = nextLocation(size);
    let rotation = nextRotation();
    spark.style.width = size + "%";
    spark.style.height = size + "%";
    spark.style.left = location.left + "%";
    spark.style.top = location.top + "%";
    spark.style.display = 'inherit';
    spark.style.transform = "rotate(" + rotation + "deg)";;
    let time = nextSparkTime();;
    disableAfterDelay(spark, time);
}

function nextFromPool(sparkIndex) {
    let instances = sparkPool[sparkIndex];
    for (const instance of instances) {
        if (instance.style.display === 'none') {
            return instance;
        }
    }
    //console.log('All sparks active!');
    return instances[0];
}

function nextSparkIndex() {
    let numSparks = sparkPool.length;
    let index = randomIntInRange(0, numSparks);
    return index;
}

function nextSparkSize() {
    let size = randomIntInRange(sizeRange.min, sizeRange.max);
    return size;
}

function nextLocation(sparkSize) {
    let max = 100 - sparkSize;
    let randLeft = randomIntInRange(0, max);
    let randTop = randomIntInRange(0, max);
    let location = { left: randLeft, top: randTop };
    return location;
}

function nextRotation() {
    let degrees = randomIntInRange(0, 360);
    return degrees;
}

function nextSparkTime() {
    let time = randomIntInRange(timeRange.min, timeRange.max);
    return time;
}

async function disableAfterDelay(element, delay) {
    await sleep(delay);
    element.style.display = 'none';
    nextSpark();
}