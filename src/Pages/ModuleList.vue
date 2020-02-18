<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-5"></div>
    <div class="md-layout-item md-size-20">
      <md-content class="md-scrollbar">
        <table>
          <tr>
            <td style="width:60%; font-size:130%">Filter By :</td>
            <td style="color:red">Clear Filters</td>
          </tr>
        </table>
        <span class="minihead">Offered in</span>
        <v-checkbox></v-checkbox>
      </md-content>
    </div>
    <div class="md-layout-item"></div>
  </div>
</template>

<script>
export default {};
</script>


<style lang="scss" scoped>
@import "~vue-material/src/theme/engine";

.md-layout-item {
  height: 1000px;

  &:nth-child(2) {
    background: md-get-palette-color(grey, 50);
  }
}
.md-content {
  max-width: 400px;
  max-height: 200px;
  overflow: auto;
  padding: 20px;
  font-family: Helvetica;
}

.md-checkbox {
  display: flex;
}
.minihead {
  font-size: 80%;
  font-weight: bold;
}
</style>
