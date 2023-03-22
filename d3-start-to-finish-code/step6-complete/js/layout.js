function layout(data) {
    let cellWidth = config.width / config.numColumns;
    let cellHeight = cellWidth;

    let maxRadius = 0.35 * cellWidth;

    let radiusScale = d3.scaleSqrt()
        .domain([0, 100])
        .range([0, maxRadius]);

    let layoutData = data.map(function(d, i) {
        let item = {};

        let column = i % config.numColumns;
        let row = Math.floor(i / config.numColumns);

        item.x = column * cellWidth + 0.5 * cellWidth;
        item.y = row * cellHeight + 0.5 * cellHeight;
        item.radius = radiusScale(d.renewable);

        return item;
    });

    return layoutData;
}
