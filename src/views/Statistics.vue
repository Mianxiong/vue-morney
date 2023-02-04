<template>
  <Layout>
    <Tabs
      class-prefix="type"
      :data-source="recordTypeList"
      :value.sync="type"
    />

    <!-- value.sync value会自动赋值，自动接受update事件 -->

    <ol v-if="groupedList.length>0">
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">{{ beautify(group.title) }} <span>￥{{group.total}}</span></h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">目前没有相关记录</div>
  </Layout>
</template>

<script lang="ts">
import Layout from "@/components/Layout.vue";
import Types from "../components/Money/Types.vue";
import { Component, Vue } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import intervalList from "../constants/intervalList";
import recordTypeList from "../constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";

// const api = dayjs();
// console.log(api);

const oneDay = 86400 * 1000;
@Component({
  components: { Types, Tabs },
})
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    return tags.length === 0 ? "无" : tags.map(t=>t.name).join("，");
  }
  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年MM月D日");
    }

    // const now = new Date();
    // if(dayjs(string).isSame(now,'day')) {
    //   return '今天'
    // } else if (dayjs(string).isSame(now.valueOf() - oneDay, "day")) {
    //   return "昨天";
    // } else {
    //   return string;
    // }

    // const d = new Date(Date.parse(string));
    // const y = d.getFullYear();
    // const m = d.getMonth();
    // const dd = d.getDate();
    // const now = new Date();
    // if(now.getFullYear() === y && now.getMonth() === m && now.getDate() === dd) {
    //   return '今天';
    // } else {
    //   return string;
    // }
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get groupedList() {
    const { recordList } = this;
    // type Items = RecordItem[];
    // type HashTableValue = { title: string; items: RecordItem };
    // const hashTable :{title:string,items: RecordItem[]}[];
    const newList = clone(recordList).filter(r=>r.type === this.type).sort(
      (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
    );
    if (newList.length === 0) {
      return [];
    }
    type Result = {title: string, total?: number, items:RecordItem[]}[]
    const result:Result = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format("YYYY-MM-DD"),
          items: [current],
        });
      }
    }
    //map是有返回值的forEach
    //forEach是没有返回值的map
    result.map(group=>{
      group.total = group.items.reduce((sum,item)=>sum+item.amount,0);
    })
    console.log("---------------------");
    console.log(result);
    return result;

    // console.log(newList.map(i=>i.createdAt))
    // const hashTable: { [key: string]: HashTableValue } = {};
    // for (let i = 0; i < recordList.length; i++) {
    //   const [date, time] = recordList[i].createdAt!.split("T");
    //   hashTable[date] = hashTable[date] || { title: date, items: [] };
    //   hashTable[date].items.push(recordList[i]);
    // }
    // console.log(hashTable);
    // return hashTable;
  }
  created() {
    this.$store.commit("fetchRecords");
  }
  type = "-";
  // interval = "day";
  // intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
.noResult{
  padding: 16px;
  text-align: center;
}
::v-deep {
  .type-tabs-item {
    background: #c4c4c4;
    &.selected {
      background: white;
      &::after {
        display: none;
      }
    }
  }
  .interval-tabs-item {
    height: 48px;
  }
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  min-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
}
.record {
  background: white;
  @extend %item;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
</style>
