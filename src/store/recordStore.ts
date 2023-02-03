import clone from "@/lib/clone";

const localStorageKeyName = "recordList";

const recordStore = {
  recordList: [] as RecordItem[], //这里this是window
  //record store
  fetchRecords() {
    this.recordList = JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    ) as RecordItem[];
    return this.recordList;
  },
  saveRecords() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
  },
  createRecord(record: RecordItem) {
    const record2: RecordItem = clone(record); // 深拷贝
    record2.createdAt = new Date();
    this.recordList && this.recordList.push(record2);
    recordStore.saveRecords();
  },
};
recordStore.fetchRecords();

export default recordStore;