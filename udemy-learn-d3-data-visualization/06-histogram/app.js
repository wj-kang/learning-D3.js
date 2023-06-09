async function draw() {
  // Data
  const dataset = await d3.json('data.json');

  // Dimensions
  let dimensions = {
    width: 800,
    height: 400,
    margins: 50,
  };

  dimensions.ctrWidth = dimensions.width - dimensions.margins * 2;
  dimensions.ctrHeight = dimensions.height - dimensions.margins * 2;

  // Draw Image
  const svg = d3 //
    .select('#chart')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height);

  const ctr = svg
    .append('g') //
    .attr('transform', `translate(${dimensions.margins}, ${dimensions.margins})`);

  const labelsGroup = ctr
    .append('g') //
    .classed('bar-labels', true);

  const xAxisGroup = ctr //
    .append('g')
    .style('transform', `translateY(${dimensions.ctrHeight}px)`);

  const meanLine = ctr.append('line').classed('mean-line', true);

  // Build Histogram
  function histogram(metric = 'humidity') {
    //
    const xAccesor = (d) => d.currently[metric];
    const yAccesor = (d) => d.length;

    // Scales
    const xScale = d3
      .scaleLinear() //
      .domain(d3.extent(dataset, xAccesor))
      .range([0, dimensions.ctrWidth])
      .nice();

    const bin = d3
      .bin() //
      .domain(xScale.domain())
      .value(xAccesor)
      .thresholds(10);

    const newDataset = bin(dataset);

    const yScale = d3
      .scaleLinear() //
      .domain([0, d3.max(newDataset, yAccesor)])
      .range([dimensions.ctrHeight, 0]);

    const exitTransition = d3.transition().duration(350);
    const updateTransition = exitTransition.transition().duration(350);

    // Draw Bars
    ctr //
      .selectAll('rect')
      .data(newDataset)
      .join(
        (enter) =>
          enter
            .append('rect')
            .attr('width', (d) => d3.max([0, xScale(d.x1) - xScale(d.x0)]) - 1)
            .attr('height', 0)
            .attr('x', (d) => xScale(d.x0))
            .attr('y', (d) => dimensions.ctrHeight)
            .attr('fill', '#b8de6f'),
        (update) => update,
        (exit) =>
          exit //
            .transition(exitTransition)
            .attr('fill', '#f39233')
            .attr('y', dimensions.ctrHeight)
            .attr('height', 0)
            .remove()
      )
      .transition(updateTransition)
      // .duration(500)
      .attr('width', (d) => d3.max([0, xScale(d.x1) - xScale(d.x0)]) - 1)
      .attr('height', (d) => dimensions.ctrHeight - yScale(yAccesor(d)))
      .attr('x', (d) => xScale(d.x0))
      .attr('y', (d) => yScale(yAccesor(d)))
      .attr('fill', '#40c4ff');

    labelsGroup
      .selectAll('text')
      .data(newDataset)
      .join(
        (enter) =>
          enter //
            .append('text')
            .attr('x', (d) => (xScale(d.x1) + xScale(d.x0)) / 2)
            .attr('y', dimensions.ctrHeight)
            .text(yAccesor),
        (update) => update,
        (exit) =>
          exit //
            .transition(exitTransition)
            .attr('y', dimensions.ctrHeight)
            .remove()
      )
      .transition()
      .attr('x', (d) => (xScale(d.x1) + xScale(d.x0)) / 2)
      .attr('y', (d) => yScale(yAccesor(d)) - 10)
      .text(yAccesor);

    const mean = d3.mean(dataset, xAccesor);
    meanLine
      .raise()
      .transition(updateTransition) //
      .attr('x1', xScale(mean))
      .attr('y1', 0)
      .attr('x2', xScale(mean))
      .attr('y2', dimensions.ctrHeight);

    // Draw Axis
    const xAxis = d3.axisBottom(xScale);
    xAxisGroup.transition().call(xAxis);
  }

  // Event on dropdown menu
  d3.select('#metric') //
    .on('change', function (e, d) {
      e.preventDefault();

      histogram(this.value);
    });

  histogram();
}

draw();
