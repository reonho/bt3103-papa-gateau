<template>
    <div id = "TreeChart" style = 'height:80vh;'/>
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
        mounted() {
        am4core.useTheme(am4themes_animated);
        // Create ge_chart
        var chart = am4core.create("TreeChart", am4plugins_forceDirected.ForceDirectedTree);
        chart.legend = new am4charts.Legend();
        var modules = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
        modules.data = [{
            "name": "Buiness Analytics",
            "value": 0,
            //fixed: true,
            //x: am4core.percent(30),
            //y: am4core.percent(50),  
            "children": this.data
        }]
        modules.nodes.template.label.text = "[bold]{name}";
        modules.nodes.template.label.fontSize = 13;
        modules.dataFields.value = "value";
        modules.dataFields.name = "name";
        modules.dataFields.off = "off"
        modules.dataFields.children = "children";
        modules.nodes.template.outerCircle.filters.push(new am4core.DropShadowFilter());
        modules.fontSize = 10;
        modules.minRadius = 69;
        modules.maxRadius = 70;
        modules.maxLevels = 1;
        modules.dataFields.collapsed = "off";
        modules.nodes.template.expandAll = false;
        //modules_Ce.dataFields.fixed = "fixed";
        //modules.nodes.template.propertyFields.x = "x";
        //modules.nodes.template.propertyFields.y = "y";
        //modules.svgContainer.autoResize;
        modules.nodes.template.adapter.add("fill", function(fill, target) {
            return fill.lighten(target.dataItem.value);

        });
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
