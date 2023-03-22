function update() {
    let layoutData = layout(data);

    d3.select('#chart')
        .selectAll('circle')
        .data(layoutData)
        .join('circle')
        .attr('cx', function(d) {
            return d.x;
        })
        .attr('cy', function(d) {
            return d.y;
        })
        .attr('r', function(d) {
            return d.radius;
        });
}
