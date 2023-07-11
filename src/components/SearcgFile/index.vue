<template>
  <div class="app">
    <el-input v-model="search"></el-input>
    <el-button @click="returnSearchData" type="primary">
      <el-icon style="vertical-align: middle">
        <Search />
      </el-icon>
      <span style="vertical-align: middle">搜索 </span>
    </el-button>
  </div>
</template>
<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { Props, emits } from "./index";

import { ref, watch } from "vue";

const props = withDefaults(defineProps<Props>(), {
  searchData: "石油",
});
const emits = defineEmits(["handleSearch"]);
//私有化props
const search = ref<string>(props.searchData);
//点击事件
const returnSearchData = () => {
  emits("handleSearch", search.value || []);
};
//设置第一次侦听赋值
watch(
  props.searchData as any,
  (newData: string) => {
    search.value = newData;
  },
  {
    immediate: true,
  }
);
</script>

<style scoped lang="scss">
.app {
  width: 444px;
  display: flex;
  :deep(.el-input__wrapper) {
    border-radius: 4px 0 0 4px;
  }
  :deep(.el-button) {
    border-radius: 0 4px 4px 0;
  }
}
</style>
