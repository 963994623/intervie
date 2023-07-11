<template>
  <div class="app">
    <div
      :class="[tableState[index].other ? '' : 'setHeight', 'condition']"
      v-for="(item, index) in tableData"
    >
      <p class="condition_label">{{ tableState[index].label }}</p>
      <div class="condition_list">
        <p
          @click="setActiveState(index, 0, '', index)"
          :class="[
            tableState[index].active == 0 ? 'tableActive' : '',
            'condition_list_item',
          ]"
        >
          不限
        </p>
        <template v-if="index == 4">
          <p
            @click="setActiveState(index, ((index3 as any) += 1), item3, index)"
            v-for="(item3, index3) in item"
            :class="[
              index3 == tableState[index].active - 1 ? 'tableActive' : '',
              'condition_list_item',
            ]"
          >
            {{ item3 }}
          </p>
        </template>
        <template v-else-if="index != 1">
          <p
            v-for="(item3, index3) in item"
            @click="
              setActiveState(index, ((index3 as any) += 1), item3.id, index)
            "
            :class="[
              index3 == tableState[index].active - 1 ? 'tableActive' : '',
              'condition_list_item',
            ]"
          >
            {{ item3.name }}
          </p>
        </template>

        <template v-else>
          <p
            @click="
              setActiveState(index, ((index3 as any) += 1), item3.id, index)
            "
            v-for="(item3, index3) in item[tableState[0].active - 1]"
            :class="[
              index3 == tableState[index].active - 1 ? 'tableActive' : '',
              'condition_list_item',
            ]"
          >
            {{ item3.name }}
          </p>
        </template>
      </div>
      <div class="condition_switch" @click="setOther(index)">
        <p>更多</p>
        <el-icon v-if="tableState[index].other" style="vertical-align: middle">
          <ArrowUp />
        </el-icon>
        <el-icon v-else style="vertical-align: middle">
          <ArrowDown />
        </el-icon>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ArrowUp, ArrowDown } from "@element-plus/icons-vue";
defineProps<{
  tableData: any;
  tableState: any[];
}>();

const emits = defineEmits(["handleClickOther", "handleClickState"]);

const setActiveState = (
  parIndex: number,
  index: number,
  itemData: string,
  key: number
) => {
  emits("handleClickState", parIndex, index, itemData, key);
};

const setOther = (index: number) => {
  emits("handleClickOther", index);
};
</script>
<style scoped lang="scss">
.app {
  width: 100%;
  padding: 0 20px;
  margin-bottom: 30px;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-sizing: border-box;
}

.setHeight {
  height: 40px;
}
.condition {
  display: flex;
  overflow: hidden;
  margin-bottom: 10px;
  .condition_label {
    width: 120px;
    line-height: 30px;
    padding-left: 10px;
    margin-top: 10px;
    color: #909399;
    font-size: 14px;
  }
  .condition_switch {
    font-size: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 68px;
    height: 30px;
    margin-top: 10px;
    color: #3473e6;
    p {
      display: flex;
    }
  }
  .tableActive {
    background-color: #3473e6;
    color: white !important;
  }
  .condition_list {
    font-size: 14px;
    flex: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-right: 74px;
    .condition_list_item {
      cursor: pointer;
      line-height: 20px;
      padding: 5px 10px;
      margin-right: 10px;
      margin-top: 10px;
      border-radius: 2px;
      color: #303133;
    }
  }
}
</style>
