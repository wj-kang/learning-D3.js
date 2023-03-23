function updateEachGroup(d) {
  const g = d3.select(this);

  if (g.selectAll('*').empty()) {
    g.append('circle');
    g.append('text') //
      .classed('label', true);
  }

  g.classed('country', true) //
    .attr('transform', `translate(${d.x},${d.y})`);

  // circle el
  g.select('circle') //
    .attr('r', d.radius);

  // text el
  g.select('.label') //
    .attr('y', d.labelOffset)
    .text(d.labelText);
}

function update() {
  let layoutData = layout(data);

  d3.select('#chart') //
    .selectAll('g')
    .data(layoutData)
    .join('g')
    .each(updateEachGroup);
}
