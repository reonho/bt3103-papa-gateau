<template>
    <div id = "TreeChartCe" style = 'height:500px;'/>
</template>


<script>
    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected"; 
    import am4themes_animated from "@amcharts/amcharts4/themes/animated";
    import * as am4charts from "@amcharts/amcharts4/charts";

    export default {
        name: "TreeChartCe",
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
        var chart_Ce = am4core.create("TreeChartCe", am4plugins_forceDirected.ForceDirectedTree);
        chart_Ce.legend = new am4charts.Legend();
        var modules_Ce = chart_Ce.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
        modules_Ce.data = [{
            "name": "Core Electives",
            fixed: true,
            x: am4core.percent(50),
            y: am4core.percent(50),  
            "children": this.extractMods(this.data.ce)
        }]
        modules_Ce.nodes.template.label.text = "[bold]{name}";
        modules_Ce.dataFields.value = "value";
        modules_Ce.dataFields.name = "name";
        modules_Ce.dataFields.children = "children";
        modules_Ce.fontSize = 10;
        modules_Ce.minRadius = 20;
        modules_Ce.maxRadius = 50;
        modules_Ce.maxLevels = 1;
        modules_Ce.dataFields.fixed = "fixed";
        modules_Ce.nodes.template.propertyFields.x = "x";
        modules_Ce.nodes.template.propertyFields.y = "y";
        modules_Ce.svgContainer.autoResize;
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
