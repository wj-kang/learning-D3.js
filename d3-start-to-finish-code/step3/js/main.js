function dataIsReady(csv) {
    console.log(csv);
}

d3.csv('data/data.csv')
    .then(dataIsReady);
