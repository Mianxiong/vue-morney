<template>
  <Layout>
    <Types
      class-prefix="type"
      :data-source="recordTypeList"
      :value.sync="type"
    />
    <Tabs
      class-prefix="interval"
      :data-source="intervalList"
      :value.sync="interval"
    />
    <!-- value.sync value会自动赋值，自动接受update事件 -->
  </Layout>
</template>

<script lang="ts">
import Layout from "@/components/Layout.vue";
import Types from "../components/Money/Types.vue";
import { Component, Vue } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import intervalList from "../constants/intervalList";
import recordTypeList from "../constants/recordTypeList";

@Component({
  components: { Types, Tabs },
})
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
  background: white;
  &.selected {
    background: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
::v-deep .interval-tabs-item {
  height: 48px;
}
</style>
