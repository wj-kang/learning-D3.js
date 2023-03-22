let menuItems = [
    {
        id: 'country',
        label: 'Country'
    },
    {
        id: 'renewable',
        label: 'Renewable'
    },
    {
        id: 'oilgascoal',
        label: 'Oil, Gas & Coal'
    },
    {
        id: 'hydroelectric',
        label: 'Hydroelectric'
    },
    {
        id: 'nuclear',
        label: 'Nuclear'
    }
];

function handleMenuClick(e, d) {
    action('setSelectedIndicator', d.id);
}

function updateMenu() {
    d3.select('#controls .menu .items')
        .selectAll('.item')
        .data(menuItems)
        .join('div')
        .classed('item', true)
        .classed('selected', function(d) {
            return state.selectedIndicator === d.id;
        })
        .text(function(d) {
            return d.label;
        })
        .on('click', handleMenuClick);
}
