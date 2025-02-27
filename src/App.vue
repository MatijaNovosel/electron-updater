<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(async () => {
  window.electronAPI.notifyAppLoaded();
});
</script>
