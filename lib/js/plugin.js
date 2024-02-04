const viewers = document.querySelectorAll('.icgb-compare-block');
[...viewers].forEach(element => {
    const hover = JSON.parse(element.getAttribute('data-hover').toLowerCase());
    const label = JSON.parse(element.getAttribute('data-label').toLowerCase());
    const verticalMode = JSON.parse(element.getAttribute('data-vertical').toLowerCase());
    const lil = element.getAttribute('data-lil');
    const ril = element.getAttribute('data-ril');

    const options = {
        controlColor: '#FFFFFF',
        controlShadow: true,
        addCircle: true,
        addCircleBlur: false,

        // Label Defaults
        showLabels: label,
        labelOptions: {
            before: lil,
            after: ril,
            onHover: false
        },

        // Smoothing
        smoothing: true,
        smoothingAmount: 100,

        // Other options
        hoverStart: hover,
        verticalMode,
        startingPoint: 50,
        fluidMode: false
    };
    new ImageCompare(element, options).mount();
});
