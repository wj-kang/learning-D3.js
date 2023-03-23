let dataset;

async function setData() {
  dataset = await d3.csv('data/data.csv');
}

function update() {
  d3.select('#chart') //
    .selectAll('circle')
    .data(dataset)
    .join('circle')
    .attr('cx', (d, i) => i * 10)
    .attr('cy', 100)
    .attr('r', 2);
}

async function init() {
  await setData();
  update();
}

init();
