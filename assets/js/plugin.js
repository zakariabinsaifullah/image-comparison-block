const viewers = document.querySelectorAll(".icgb-compare-block");
viewers.forEach((element) => {
    let hover = JSON.parse(element.getAttribute("data-hover").toLowerCase());
    let label = JSON.parse(element.getAttribute("data-label").toLowerCase());
    let verticalMode = JSON.parse(element.getAttribute("data-vertical").toLowerCase());
    let lil = element.getAttribute("data-lil");
    let ril = element.getAttribute("data-ril");


    let options = {
        controlColor: "#FFFFFF",
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
        verticalMode: verticalMode,
        startingPoint: 50,
        fluidMode: false
    };
        new ImageCompare(element, options).mount();
});