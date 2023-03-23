async function getData() {
  return await d3.csv('data/data.csv', (row) => {
    return {
      // we can use converter call back function here. something like parseFloat(v)
      ...row,
    };
  });
}

async function render() {
  d3.select('body') //
    .selectAll('g3')
    .data(await getData())
    .join('div')
    .text((d, i) => i + ': ' + JSON.stringify(d));
}

render();
