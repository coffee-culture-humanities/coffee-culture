// 示例JavaScript代码
document.addEventListener('DOMContentLoaded', function () {
    // 页面加载完毕后的逻辑
});


/**
* ---------------------------------------
* This demo was created using amCharts 5.
*
* For more information visit:
* https://www.amcharts.com/
*
* Documentation is available at:
* https://www.amcharts.com/docs/v5/
* ---------------------------------------
*/

// Create root and chart
var root = am5.Root.new("chartdiv", {
    tooltipContainerBounds: {
        top: 50,
        // right: 50,
        right: 0,
        bottom: 50,
        left: 50
    }
});

// Set themes
root.setThemes([
    am5themes_Animated.new(root)
]);

var chart = root.container.children.push(
    am5map.MapChart.new(root, {
        panX: "rotateX",
        projection: am5map.geoNaturalEarth1()
    })
);

// Create polygon series
var polygonSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"]
    })
);

var polygonSeries_v2 = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        include: ["ET", "RW", "ID", "VN", "BR", "CO", "CN"]
    })
);

polygonSeries.mapPolygons.template.setAll({
    // tooltipHTML: "<div style='background:#000'>{name}</div>",
    templateField: "polygonSettings",
    interactive: false, // Disable interaction
    fill: am5.color(0xDDDDDD), // Grey color
});

polygonSeries_v2.mapPolygons.template.setAll({
    tooltipHTML: `<div 
                style='border: 1px solid rgba(242,242,242,1); 
                border-radius:5px; 
                width: 200px; 
                background:#FFF; 
                padding: 0px 0px 20px 20px;
                text-align: justify'>{brief}</div>`,
    templateField: "polygonSettings",
    interactive: true, // Disable interaction
    fill: am5.color(0xFF8C42), // Grey color
    callbk: () => { console.log(name) }
});

// polygonSeries_v2.mapPolygons.template.events.on("click", function (ev) {
//     console.log("Clicked on", ev.target.dataItem.get("id"));
// });

polygonSeries_v2.mapPolygons.template.events.on("click", function (ev) {
    console.log("Clicked on", ev.target.dataItem.get("id"));

    // Set modal content dynamically based on clicked polygon
    var countryId = ev.target.dataItem.get("id");
    var content = "Clicked on country with ID: " + countryId; // Customize this as needed
    modalBody = document.getElementsByClassName('modal-body')
    console.log(modalBody)
    modalBody[0].innerHTML = `<img src="./img/CN.png"></img>`
    // Open the modal using jQuery
    $('#infoModal').modal('show');
});


// polygonSeries_v2.mapPolygons.template.states.create("hover", {
//     fill: am5.color(0xffffff),
// });

polygonSeries_v2.data.setAll([{
    id: "ET",
    brief: `<h4>Ethiopia</h4>
            <p>Africa</p>`, detail: "??",
    polygonSettings: {
        fill: am5.color(0xFF8C42),
        interactive: true
    },
}, {
    id: "RW",
    brief: `<h4>Rwanda</h4>
            <p>Africa</p>`,
    detail: "??",
    polygonSettings: {
        fill: am5.color(0xFF8C42),
        interactive: true,
    }
}, {
    id: "ID",
    brief: `<h4>Indonesia</h4>
            <p>Asia</p>`,
    detail: "??",
    polygonSettings: {
        fill: am5.color(0xFF8C42),
        interactive: true,
    },
}, {
    id: "VN",
    brief: `<h4>Vietnam</h4>
            <p>Asia</p>`,
    detail: "??",
    polygonSettings: {
        fill: am5.color(0xFF8C42),
        interactive: true,
    },
}, {
    id: "BR",
    brief: `<h4>Brazil</h4>
            <p>America</p>`,
    detail: "??",
    polygonSettings: {
        fill: am5.color(0xFF8C42),
        interactive: true,
    },
}, {
    id: "CO",
    brief: `<h4>Colombia</h4>
            </p>America</p>`,
    detail: "??",
    polygonSettings: {
        fill: am5.color(0xFF8C42),
        interactive: true,
    },
}, {
    id: "CN",
    brief: `<h4>China</h4>
            </p>Asia</p>`,
    detail: "??",
    polygonSettings: {
        fill: am5.color(0xFF8C42),
        interactive: true,
    },
}])

var pointSeries = chart.series.push(
    am5map.MapPointSeries.new(root, {
        polygonIdField: "country",
    })
);

pointSeries.data.setAll([{
    country: "ET",
    name: "Ethiopia",

}, {
    country: "RW",
    name: "Rwanda",

}, {
    country: "ID",
    name: "Indonesia",

}, {
    country: "VN",
    name: "Vietnam",

}, {
    country: "BR",
    name: "Brazil",

}, {
    country: "CO",
    name: "Colombia",

}, {
    country: "CN",
    name: "China",

}]);

var countries = [{
    id:"CN",
    img:"./img/CN.png"
}]

pointSeries.bullets.push(function () {
    return am5.Bullet.new(root, {
        sprite: am5.Label.new(root, {
            centerX: am5.p50,
            centerY: am5.p50,
            html: `<div onclick='test()'><h3 id='{name}'>{name}</h3></div>`,
            populateText: true
        })
    });
});

function test() {
    console.log('param')
}
