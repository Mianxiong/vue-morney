import recordStore from "./recordStore";
import tagStore from "./tagStore";

const store = {
  ...recordStore,
  ...tagStore,
  count: 0,
  addCount() {
    this.count += 1;
  }
  
};

export default store;
