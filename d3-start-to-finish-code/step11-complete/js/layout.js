function getTruncatedLabel(text) {
    return text.length <= 10 ? text : text.slice(0, 10) + '...';
}

function layout(data) {
    let labelHeight = 20;
    let cellWidth = config.width / config.numColumns;
    let cellHeight = cellWidth + labelHeight;

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

        item.renewableRadius = radiusScale(d.renewable);
        item.oilGasCoalRadius = radiusScale(d.oilgascoal);
        item.hydroelectricRadius = radiusScale(d.hydroelectric);
        item.nuclearRadius = radiusScale(d.nuclear);

        item.labelText = getTruncatedLabel(d.name);
        item.labelOffset = maxRadius + labelHeight;

        item.popupOffset = -0.8 * maxRadius;
        item.popupData = {
            name: d.name,
            renewable: d.renewable,
            oilgascoal: d.oilgascoal,
            hydroelectric: d.hydroelectric,
            nuclear: d.nuclear
        };

        return item;
    });

    return layoutData;
}
