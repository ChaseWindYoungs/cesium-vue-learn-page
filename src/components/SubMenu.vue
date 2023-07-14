<template>
  <el-menu default-active="/home" class="sub-menu">
    <el-menu-item :index="item.path" v-for="item in commonRoutes" :key="item.path" @click="goto(item)">
      <el-icon><icon-menu /></el-icon>
      <span>{{ item.name }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { commonRoutes } from '@/router/index'
import router from "@/router";
import { RouteLocationRaw } from 'vue-router';

function goto(item: { path: RouteLocationRaw; }) {
  router.push(item.path);
}
</script>

<style lang="scss" scoped>
.sub-menu{
  margin-top: 40px;
}
</style>
