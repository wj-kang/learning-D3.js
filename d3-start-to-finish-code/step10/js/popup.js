const popup = Popup();

function getPopupEntry(d, type, label) {
  if (!isNaN(d.popupData[type])) {
    return `<div>${label}: ${d.popupData[type]}%</div>`;
  }
  return '';
}

function popupTemplate(d) {
  let html = '';
  html += '<h3>' + d.popupData.name + '</h3>';
  html += getPopupEntry(d, 'renewable', 'Renewable');
  html += getPopupEntry(d, 'oilgascoal', 'Oil, Gas & Coal');
  html += getPopupEntry(d, 'hydroelectric', 'Hydroelectric');
  html += getPopupEntry(d, 'nuclear', 'Nuclear');

  return html;
}

function handleMouseOver(e, d) {
  const popupCenter = d3.select(this).select('.popup-center').node();

  popup
    .point(popupCenter) //
    .html(popupTemplate(d))
    .draw();
}

function handleMouseOut() {
  popup.hide();
}
