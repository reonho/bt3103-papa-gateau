<template>
<div>Test</div>
</template>

<script>


export default {
    name: 'sankey',
    props: {
        msg: String,
    },
    components:{
        
        
    },
    data: function(){ 
        return {
        chartData: [
        ['Year', 'Sales', 'Expenses', 'Profit'],
        ['2014', 1000, 400, 200],
        ['2015', 1170, 460, 250],
        ['2016', 660, 1120, 300],
        ['2017', 1030, 540, 350]
        ],
        chartOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        }
      }
            
        };
    },
    methods: {
     
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './style.css';
</style>
