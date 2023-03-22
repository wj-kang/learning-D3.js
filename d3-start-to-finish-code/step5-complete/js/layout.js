function layout(data) {

    let radiusScale = d3.scaleSqrt()
        .domain([0, 100])
        .range([0, 20]);

    let layoutData = data.map(function(d, i) {
        let item = {};

        item.x = i * 10;
        item.y = 100;
        item.radius = radiusScale(d.renewable);

        return item;
    });

    return layoutData;
}
