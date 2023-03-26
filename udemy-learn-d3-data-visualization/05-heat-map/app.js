async function draw(el, scale = 'linear') {
  // Data
  const dataset = await d3.json('data.json');
  dataset.sort((a, b) => a - b);

  // Dimensions
  let dimensions = {
    width: 600,
    height: 150,
  };

  const box = 30;

  // Draw Image
  const svg = d3 //
    .select(el)
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height);

  // Scales
  let colorScale;

  if (scale === 'linear') {
    colorScale = d3
      .scaleLinear() //
      .domain(d3.extent(dataset))
      .range(['white', 'red']);
    //
  } else if (scale === 'quantize') {
    colorScale = d3 //
      .scaleQuantize()
      .domain(d3.extent(dataset))
      .range(['white', 'pink', 'red']);
    //
  } else if (scale === 'quantile') {
    colorScale = d3 //
      .scaleQuantile()
      .domain(dataset)
      .range(['white', 'pink', 'red']);
    //
  } else if (scale === 'threshold') {
    colorScale = d3 //
      .scaleThreshold()
      .domain([45200, 135600])
      .range(d3.schemeReds[3]);
    // .range(['white', 'pink', 'red']);
  }

  // Rectangles
  svg
    .append('g') //
    .selectAll('rect')
    .data(dataset)
    .join('rect')
    .attr('width', box - 4)
    .attr('height', box - 4)
    .attr('x', (d, i) => box * (i % (dimensions.width / box)))
    .attr('y', (d, i) => box * Math.floor(i / (dimensions.width / box)))
    .attr('transform', 'translate(2, 2)')
    .attr('stroke', '#ccc')
    .attr('stroke-width', '1')
    .attr('fill', colorScale);
}

draw('#heatmap1', 'linear');
draw('#heatmap2', 'quantize');
draw('#heatmap3', 'quantile');
draw('#heatmap4', 'threshold');
