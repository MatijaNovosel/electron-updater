<template>
  <div class="column items-center justify-center full-height full-width">
    <q-btn class="base_btn" color="blue" dense @click="checkForUpdates"> Check for updates </q-btn>
    <q-btn class="base_btn q-mt-md" color="green" dense @click="update"> Update </q-btn>
    <div class="q-mt-lg">Version {{ version }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const version = ref(import.meta.env.VITE_APP_VERSION);

const checkForUpdates = () => {
  return "1.0.0";
};

const update = () => {
  //
};
</script>
