<template>
    <div id = "TreeChartPe" style = 'height:500px;'/>
</template>


<script>
    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected"; 
    import am4themes_animated from "@amcharts/amcharts4/themes/animated";
    import * as am4charts from "@amcharts/amcharts4/charts";

    export default {
        name: "TreeChartPe",
        props: [
            "data"
        ],
        methods: {
            extractMods(data) {
                var geData = []
                for (var i = 0; i < data.length; i++){
                    geData.push({
                        "name": data[i],
                        "value": 1
                    })
                }
                return geData
            },
        },
        mounted() {
        am4core.useTheme(am4themes_animated);
        // Create ge_chart
        var chart_Pe = am4core.create("TreeChartPe", am4plugins_forceDirected.ForceDirectedTree);
        chart_Pe.legend = new am4charts.Legend();
        var modules_Pe = chart_Pe.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
        modules_Pe.data = [{
            "name": "General Electives",
            fixed: true,
            x: am4core.percent(50),
            y: am4core.percent(50),  
            "children": this.extractMods(this.data.pe)
        }]
        modules_Pe.nodes.template.label.text = "[bold]{name}";
        modules_Pe.dataFields.value = "value";
        modules_Pe.dataFields.name = "name";
        modules_Pe.dataFields.children = "children";
        modules_Pe.fontSize = 10;
        modules_Pe.minRadius = 20;
        modules_Pe.maxRadius = 50;
        modules_Pe.maxLevels = 1;
        modules_Pe.dataFields.fixed = "fixed";
        modules_Pe.nodes.template.propertyFields.x = "x";
        modules_Pe.nodes.template.propertyFields.y = "y";
        modules_Pe.svgContainer.autoResize;
        /*nodeTemplate.events.on("out", function (event) {
            var dataItem = event.target.dataItem;
            dataItem.childLinks.each(function (link) {
                link.isHover = false;*/
        }
    }
    

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './style.css';
</style>
