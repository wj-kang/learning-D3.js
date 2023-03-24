async function draw() {
  const dataset = await d3.json('data.json');

  function xAccesor(d) {
    return d.currently.humidity;
  }

  function yAccesor(d, i) {
    return d.currently.apparentTemperature;
  }

  // Dimensions
  const dimensions = {
    width: 800,
    height: 800,
    margin: {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50,
    },
  };

  dimensions.ctrWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.ctrHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  // Draw Image
  const svg = d3 //
    .select('#chart')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height);

  const container = svg
    .append('g') //
    .attr('transform', `translate(${dimensions.margin.left}, ${dimensions.margin.top})`);

  // Scales
  const xScale = d3 //
    .scaleLinear()
    .domain(d3.extent(dataset, xAccesor))
    .rangeRound([0, dimensions.ctrWidth])
    .nice()
    .clamp(true);
  // .range([0, dimensions.ctrWidth]);

  const yScale = d3 //
    .scaleLinear()
    .domain(d3.extent(dataset, yAccesor))
    .rangeRound([dimensions.ctrHeight, 0])
    .nice() // temperature -> decimal value rounding
    .clamp(true);

  // Draw Circles
  container //
    .selectAll('circle')
    .data(dataset)
    .join('circle')
    .attr('cx', (d) => xScale(xAccesor(d)))
    .attr('cy', (d) => yScale(yAccesor(d)))
    .attr('r', 5)
    .attr('fill', 'brown')
    .attr('data-temp', yAccesor);

  // Axes
  const xAxis = d3
    .axisBottom(xScale) //
    .tickValues([0.4, 0.6, 0.8, 1])
    // .ticks(5)
    .tickFormat((d) => `${d * 100}%`);

  const xAxisGroup = container //
    .append('g')
    .call(xAxis)
    .style('transform', `translateY(${dimensions.ctrHeight}px)`)
    .classed('axis', true);

  xAxisGroup
    .append('text')
    .attr('x', dimensions.ctrWidth / 2)
    .attr('y', dimensions.margin.bottom - 10)
    .attr('fill', 'black')
    .text('Humidity');

  const yAxis = d3.axisLeft(yScale);

  const yAxisGroup = container //
    .append('g')
    .call(yAxis)
    .style('transform', `translateX(${0}px)`)
    .classed('axis', true);

  yAxisGroup
    .append('text')
    .attr('x', -dimensions.ctrHeight / 2)
    .attr('y', -dimensions.margin.left + 15)
    .attr('fill', 'black')
    .html('Temperature &deg; F')
    .style('transform', 'rotate(270deg)')
    .style('text-anchor', 'middle');
}

draw();
