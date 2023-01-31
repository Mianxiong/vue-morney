<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money"/>
      记账
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="label"/>
      标签
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
import Icon from "@/components/Icon.vue";
// import x from "@/assets/icons/label.svg";
// console.log("🚀 ~ file: Nav.vue:18 ~ x", x)
// import y from '@/assets/icons/money.svg';
// console.log("🚀 ~ file: Nav.vue:20 ~ y", y)

// loader第一步把这个svg变成symbol标签，第二步把这个symbol标签放到svg里面
// 这两个symbol外面套一个svg
// 第三步把这个svg放到body里面

export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav{
  @extend %outerShadow;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  > .item {
    padding: 2px 0;
    width: 33.3333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .icon {
      width: 32px;
      height: 32px;
    }
  }
  > .item.selected{
    color:$color-highlight;
  }
}
</style>
