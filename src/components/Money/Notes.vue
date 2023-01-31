<template>
  <div>
    <label class="notes">
      <span>备注</span>
      <input type="text" v-model="value" placeholder="在这里输入备注" />
    </label>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Notes extends Vue {
  value = '';
  onInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement
    this.value = input.value
  }
}
</script>
<style lang='scss' scoped>
.notes {
  font-size: 14px;
  background: hsl(0, 0%, 96%);
  display: block;
  padding-left: 16px;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 64px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>
