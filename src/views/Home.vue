<template>
  <div class="column items-center justify-center full-height full-width">
    <q-btn class="base_btn" color="blue" dense @click="checkForUpdates"> Check for updates </q-btn>
    <q-btn :disable="upToDate" class="base_btn q-mt-md" color="green" dense @click="update">
      Update
    </q-btn>
    <div class="q-mt-lg">App version {{ version }}</div>
    <div class="q-mt-sm">Remote version {{ newestVersion }}</div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { computed, onMounted, ref } from "vue";

const version = ref<string>("");
const newestVersion = ref<string>("");

const checkForUpdates = async () => {
  await window.electronAPI.checkForUpdates();
  const response = await axios.get<string>("http://localhost:8080/version.txt");
  newestVersion.value = response.data.trim();
};

const upToDate = computed(() => version.value === newestVersion.value);

const update = async () => {
  await window.electronAPI.update();
};

onMounted(async () => {
  version.value = import.meta.env.VITE_APP_VERSION;
  await checkForUpdates();
});
</script>
