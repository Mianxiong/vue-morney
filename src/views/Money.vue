
<template>
  <Layout class-prefix="layout">
    {{ recordList }}
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Types :value.sync="record.type" />
    <div class="notes">
      <FormItem field-name="备注" placeholder="在这里输入备注" @update:value="onUpdateNotes" />
    </div>
    
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
  </Layout>
</template>

<script lang="ts">
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component, Vue, Watch } from "vue-property-decorator";
import recordListModel from '@/models/recordListModel'
import tagListModel from '@/models/tagListModel'

const version = window.localStorage.getItem("version") || "0";
const recordList = recordListModel.fetch()
const tagList = tagListModel.fetch()

if (version === "0.0.1") {
  //数据库升级，数据迁移
  recordList.forEach((record) => {
    record.createdAt = new Date(0);
  });
  //保存数据
  window.localStorage.setItem("recordList", JSON.stringify(recordList));
}
window.localStorage.setItem("version", "0.0.2");

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
  tags = tagList;
  recordList: RecordItem[] = recordList;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 10,
  };
  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    const record2: RecordItem = recordListModel.clone(this.record); // 深拷贝
    record2.createdAt = new Date();
    this.recordList.push(record2);
  }
  @Watch("recordList")
  onRecordListChange() {
    recordListModel.save(this.recordList)
  }
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