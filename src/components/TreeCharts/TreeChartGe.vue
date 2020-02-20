<template>
    <div id = "TreeChartGe" style = 'height:500px;'/>
</template>


<script>
    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected"; 
    import am4themes_animated from "@amcharts/amcharts4/themes/animated";
    import * as am4charts from "@amcharts/amcharts4/charts";

    export default {
        name: "TreeChartGe",
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
        var chart_ge = am4core.create("TreeChartGe", am4plugins_forceDirected.ForceDirectedTree);
        chart_ge.legend = new am4charts.Legend();
        var modules_ge = chart_ge.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
        modules_ge.data = [{
            "name": "General Electives",
            fixed: true,
            x: am4core.percent(50),
            y: am4core.percent(50),  
            "children": this.extractMods(this.data.ge)
        }]
        modules_ge.nodes.template.label.text = "[bold]{name}";
        modules_ge.dataFields.value = "value";
        modules_ge.dataFields.name = "name";
        modules_ge.dataFields.children = "children";
        modules_ge.fontSize = 10;
        modules_ge.minRadius = 20;
        modules_ge.maxRadius = 50;
        modules_ge.maxLevels = 1;
        modules_ge.dataFields.fixed = "fixed";
        modules_ge.nodes.template.propertyFields.x = "x";
        modules_ge.nodes.template.propertyFields.y = "y";
        modules_ge.svgContainer.autoResize;
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
