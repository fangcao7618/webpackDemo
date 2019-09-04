const ARR_SIZE = 1000000;
const hugeArr = new Array(ARR_SIZE).fill(1);
// inclues
const incluesTest = () => {
    const arrCopy = [];
    console.time("inclues");
    let i = 0;
    while (i < hugeArr.length) {
        arrCopy.includes(i++);
    }
    console.timeEnd("inclues");
};

// indexOf
const indexOfTest = () => {
    const arrCopy = [];
    console.time("incluesOf");
    for (let item of hugeArr) {
        arrCopy.indexOf(item);
    }
    console.timeEnd("incluesOf");
};
incluesTest();
indexOfTest();
