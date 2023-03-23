function update(data) {
  let layoutData = layout(data);

  d3.select('#chart') //
    .selectAll('circle')
    .data(layoutData)
    .join('circle')
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('r', (d) => d.radius);
}
