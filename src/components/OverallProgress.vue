<template>
    <div>
        <!--h1 style = "text-align: center; margin-top: 20">Overall Academic Progress</h1-->
        <div id = "chartdiv" style = 'height:50vh;'/>
    </div>
</template>


<script>
    import * as am4core from "@amcharts/amcharts4/core";
    import am4themes_animated from "@amcharts/amcharts4/themes/animated";
    import * as am4charts from "@amcharts/amcharts4/charts";

    export default {
        name: "OverallProgress",
        props: [
            "data"
        ],
        data: function(){
            return {
                percentDone: 40
            }
        },
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
            // create chart
            var chart = am4core.create("chartdiv", am4charts.GaugeChart);
            chart.innerRadius = am4core.percent(82);

            /**
             * Normal axis
             */

            var axis = chart.xAxes.push(new am4charts.ValueAxis());
            axis.min = 0;
            axis.max = 100;
            axis.strictMinMax = true;
            axis.renderer.radius = am4core.percent(80);
            axis.renderer.inside = true;
            axis.renderer.line.strokeOpacity = 1;
            axis.renderer.ticks.template.strokeOpacity = 1;
            axis.renderer.ticks.template.length = 10;
            axis.renderer.grid.template.disabled = true;
            axis.renderer.labels.template.radius = 40;
            axis.renderer.labels.template.adapter.add("text", function(text) {
            return text + "%";
            })

            /**
             * Axis for ranges
             */

            var colorSet = new am4core.ColorSet();

            var axis2 = chart.xAxes.push(new am4charts.ValueAxis());
            axis2.min = 0;
            axis2.max = 100;
            axis2.renderer.innerRadius = 10
            axis2.strictMinMax = true;
            axis2.renderer.labels.template.disabled = true;
            axis2.renderer.ticks.template.disabled = true;
            axis2.renderer.grid.template.disabled = true;

            var range0 = axis2.axisRanges.create();
            range0.value = 0;
            range0.endValue = 50;
            range0.axisFill.fillOpacity = 1;
            range0.axisFill.fill = colorSet.getIndex(16);

            var range1 = axis2.axisRanges.create();
            range1.value = 50;
            range1.endValue = 100;
            range1.axisFill.fillOpacity = 1;
            range1.axisFill.fill = colorSet.getIndex(9);

            /**
             * Label
             */

            var label = chart.radarContainer.createChild(am4core.Label);
            label.isMeasured = false;
            label.fontSize = 45;
            label.x = am4core.percent(50);
            label.y = am4core.percent(100);
            label.horizontalCenter = "middle";
            label.verticalCenter = "bottom";
            label.text =  this.percentDone + "%";


            /**
             * Hand
             */

            var hand = chart.hands.push(new am4charts.ClockHand());
            hand.axis = axis2;
            hand.innerRadius = am4core.percent(20);
            hand.startWidth = 10;
            hand.pin.disabled = true;
            hand.value = 0

            hand.events.on("propertychanged", function(ev) {
            range0.endValue = ev.target.value;
            range1.value = ev.target.value;
            axis2.invalidate();
            });
            setInterval(() => {
                new am4core.Animation(hand, {
                    property: "value",
                    to: this.percentDone
                }, 1000, am4core.ease.cubicOut).start();
                }, 200);
        }}

    

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './style.css';
</style>
