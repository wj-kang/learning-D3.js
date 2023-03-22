function initialiseGroup(g) {
    g.classed('country', true)
        .on('mouseover', handleMouseover)
        .on('mouseout', handleMouseout);

    g.append('circle')
        .classed('popup-center', true)
        .attr('r', 1);

    g.append('circle')
        .classed('renewable', true);

    g.append('circle')
        .classed('oilgascoal', true);

    g.append('circle')
        .classed('hydroelectric', true);

    g.append('circle')
        .classed('nuclear', true);

    g.append('text')
        .classed('label', true);
}

function updateGroup(d, i) {
    let g = d3.select(this);

    if(g.selectAll('*').empty()) initialiseGroup(g);

    g.attr('transform', 'translate(' + d.x + ',' + d.y + ')')
        .style('opacity', d.visible ? 1 : 0)
        .style('pointer-events', d.visible ? 'all' : 'none');

    g.select('.popup-center')
        .attr('cy', d.popupOffset);

    g.select('.renewable')
        .attr('r', d.renewableRadius);

    g.select('.oilgascoal')
        .attr('r', d.oilGasCoalRadius);

    g.select('.hydroelectric')
        .attr('r', d.hydroelectricRadius);

    g.select('.nuclear')
        .attr('r', d.nuclearRadius);

    g.select('.label')
        .attr('y', d.labelOffset)
        .text(d.labelText);
}

function updateChart() {
    let layoutData = layout(data);

    d3.select('#chart')
        .selectAll('g')
        .data(layoutData)
        .join('g')
        .each(updateGroup);
}

function update() {
    updateChart();
    updateMenu();
}
