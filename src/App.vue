<script setup lang="ts">
import SubMenu from './components/SubMenu.vue'
</script>

<template>
  <div class="app-container">
    <div class="left-menu">
      <SubMenu />
    </div>
    <div class="right-info">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
}

.left-menu {
  width: 200px;
  background: #e4e4e44f;
  height: 100vh;
}

.right-info {
  flex: 1;
}
</style>
