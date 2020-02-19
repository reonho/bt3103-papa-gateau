<template>
    <div id = "TreeChart"></div>
</template>


<script>
    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected"; 
    import am4themes_animated from "@amcharts/amcharts4/themes/animated";
    import * as am4charts from "@amcharts/amcharts4/charts";

    export default {
        name: "TreeChart",
        mounted() {
            // Create chart
        am4core.useTheme(am4themes_animated);
        var chart = am4core.create("TreeChart", am4plugins_forceDirected.ForceDirectedTree);
        chart.legend = new am4charts.Legend();
        var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())

        networkSeries.data = [{
        name: 'Fruity',
        fixed: true,
        x: am4core.percent(40),
        y: am4core.percent(50),    
        children: [{
            name: 'Berry',
            children: [{
            name: 'Blackberry', value: 1
            }, {
            name: 'Raspberry', value: 1
            }, {
            name: 'Blueberry', value: 1
            }, {
            name: 'Strawberry', value: 1
            }]
        }, {
            name: 'Dried Fruit',
            children: [{
            name: 'Raisin', value: 1
            }, {
            name: 'Prune', value: 1
            }]
        }, {
            name: 'Other Fruit',
            children: [{
            name: 'Coconut', value: 1, link: ["Drief Fruit"]
            }, {
            name: 'Cherry', value: 1
            }, {
            name: 'Pomegranate', value: 1
            }, {
            name: 'Pineapple', value: 1
            }, {
            name: 'Grape', value: 1
            }, {
            name: 'Apple', value: 1
            }, {
            name: 'Peach', value: 1
            }, {
            name: 'Pear', value: 1
            }]
        }, {
            name: 'Citrus Fruit',
            children: [{
            name: 'Grapefruit', value: 1
            }, {
            name: 'Orange', value: 1
            }, {
            name: 'Lemon', value: 1
            }, {
            name: 'Lime', value: 1
            }]
        }]
        }];

    networkSeries.dataFields.linkWith = "linkWith";
    networkSeries.dataFields.name = "name";
    networkSeries.dataFields.id = "name";
    networkSeries.dataFields.value = "value";
    networkSeries.dataFields.children = "children";
    networkSeries.dataFields.fixed = "fixed";

    networkSeries.nodes.template.propertyFields.x = "x";
    networkSeries.nodes.template.propertyFields.y = "y";

    networkSeries.nodes.template.tooltipText = "{name}";
    networkSeries.nodes.template.fillOpacity = 1;

    networkSeries.nodes.template.label.text = "{name}"
    networkSeries.fontSize = 8;
    networkSeries.maxLevels = 3;
    networkSeries.nodes.template.label.hideOversized = true;
    networkSeries.nodes.template.label.truncate = true;
    }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './style.css';
</style>
