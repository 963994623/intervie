<template>
  <div class="app">
    <div class="result">
      <div class="result_header">
        <div v-for="item in title" class="result_header_item">
          {{ item }}
        </div>
      </div>
      <div class="result_body">
        <div v-for="item in data.list" class="result_body_item item">
          <div style="flex: 1 1 420px">
            <p class="tw-text-[16px] tw-font-bold tw-line-clamp-2">
              {{ item.title }}
            </p>
            <!---->
          </div>
          <div class="item_col itemFlex" style="flex: 1 1 440px">
            <img
              :src="
                item.avatarUrl
                  ? item.avatarUrl
                  : 'https://test.nttcc.com.cn/_nuxt/img/default_avatar.442622a.png'
              "
              style="object-fit: cover"
            />
            <p>{{ item.orgName }}</p>
          </div>
          <div class="item_col" style="flex: 1 1 370px">
            <p>{{ item.serviceTypeName }}</p>
          </div>
          <div class="item_col" style="flex: 1 1 260px">
            <p>{{ item.platformScore }}</p>
          </div>
          <div class="item_col" style="flex: 1 1 270px">
            <p>{{ item.avgScore }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="data.total"
        @current-change="getPageNum"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { searchTableShowDataDI } from "./index";
defineProps<{
  title: string[];
  data: searchTableShowDataDI;
}>();
const emits = defineEmits(["pageChange"]);
const getPageNum = (inedx: number) => {
  emits("pageChange", inedx);
};
</script>
<style scoped lang="scss">
.result_header {
  width: 100%;
  height: 48px;
  padding: 0 20px;
  background: #f7f8f9;
  border-radius: 4px;
  display: flex;
}
.result_header_item {
  color: #909399;
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.result_header > div {
  padding: 0 20px;
}
.footer {
  display: flex;
  justify-content: center;
}
.item_col {
  padding: 0 20px;
}
.result_header > div:nth-child(1) {
  flex: 420px;
}
.result_header > div:nth-child(2) {
  flex: 440px;
  padding-left: 80px;
}
.result_header > div:nth-child(3) {
  flex: 400px;
}
.result_header > div:nth-child(4) {
  flex: 350px;
}
.result_header div:nth-child(5) {
  flex: 300px;
}
.result_body_item {
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 80px;
  background: #fff;
  border-radius: 4px;
  margin-bottom: 10px;
  border: 1px solid #eee;
  display: flex;
  align-items: center;
}
.result_body {
  margin-top: 10px;
  .item {
    padding: 0 20px;
    display: flex;
    img {
      width: 40px;
      height: 40px;
      margin-right: 20px;
    }
  }
}
.itemFlex {
  display: flex;
}
</style>
