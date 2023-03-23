let data;

const radiusScale = d3
  .scaleSqrt() //
  .domain([0, 100])
  .range([0, 20]);

function update() {
  d3.select('#chart')
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', function (d, i) {
      return i * 10;
    })
    .attr('cy', 100)
    .attr('r', (d) => radiusScale(d.renewable));
}

function dataIsReady(csv) {
  data = csv;
  console.log(data);
  update();
}

function csvRowConverter(row) {
  const res = {};
  Object.keys(row).forEach((key) => {
    if (key === 'name' || key === 'id') {
      res[key] = row[key];
    } else {
      res[key] = parseFloat(row[key]);
    }
  });

  return res;
}

d3.csv('data/data.csv', csvRowConverter).then(dataIsReady);
