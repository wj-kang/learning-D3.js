function getTruncatedLabel(text) {
  return text.length <= 10 ? text : text.slice(0, 10) + '...';
}

function layout(data) {
  const labelHeight = 20;
  const cellWidth = config.width / config.numColumns;
  const cellHeight = cellWidth + labelHeight;
  const maxRadius = 0.35 * cellWidth;

  const radiusScale = d3.scaleSqrt().domain([0, 100]).range([0, maxRadius]);

  let layoutData = data.map(function (d, i) {
    let item = {};

    let column = i % config.numColumns;
    let row = Math.floor(i / config.numColumns);

    item.x = column * cellWidth + 0.5 * cellWidth;
    item.y = row * cellHeight + 0.5 * cellHeight;
    item.radius = radiusScale(d.renewable);
    item.labelText = getTruncatedLabel(d.name);
    item.labelOffset = maxRadius + labelHeight;

    return item;
  });

  return layoutData;
}
