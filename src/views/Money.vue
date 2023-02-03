
<template>
  <Layout class-prefix="layout">
    {{ record }}
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Types :value.sync="record.type" />
    <div class="notes">
      <FormItem
        field-name="备注"
        placeholder="在这里输入备注"
        @update:value="onUpdateNotes"
      />
    </div>

    <Tags @update:value="onUpdateTags" />
    <!-- {{ count }}
    <button @click="$store.commit('increment', 1)">+1</button> -->
  </Layout>
</template>

<script lang="ts">
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component, Vue } from "vue-property-decorator";
import store from "@/store/index";

const version = window.localStorage.getItem("version") || "0";
// const recordList = recordListModel.fetch();
// const tagList = tagListModel.fetch();

// if (version === "0.0.1") {
//   //数据库升级，数据迁移
//   store.recordList.forEach((record) => {
//     record.createdAt = new Date(0);
//   });
//   //保存数据
//   window.localStorage.setItem("recordList", JSON.stringify(store.recordList));
// }
// window.localStorage.setItem("version", "0.0.2");

// type RecordItem = {
//   tags: string[];
//   notes: string;
//   type: string;
//   amount: number; //数据类型 object | string
//   createdAt?: Date; //类/构造函数
// };

@Component({
  components: { NumberPad, Types, FormItem, Tags },
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 10,
  };
  created() {
    this.$store.commit("fetchRecords");
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    // oldStore.createRecord(this.record);
    this.$store.commit("createRecord", this.record);
  }
  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }
  add() {
    this.$store.commit("increment", 1);
    store.commit("increment", 1);
  }
  // @Watch("recordList")
  // onRecordListChange() {
  //   recordListModel.save();
  // }
  // onUpdateType(value: string) {
  //   this.record.type = value
  // }
  // onUpdateAmount(value:string) {
  //   this.record.amount = parseFloat(value)
  // }
}
</script>


<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
}
</style>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
</style>