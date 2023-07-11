<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  document.body.style.setProperty("--el-color-primary", "#3473e6");
  // document.body.style.setProperty("--el-color-primary-light-9", "#F5FBF0");
  // document.body.style.setProperty("--el-color-primary-light-3", "#95d475");
});
</script>
<style scoped lang="scss"></style>
