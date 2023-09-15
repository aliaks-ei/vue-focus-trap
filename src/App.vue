<template>
  <Dialog v-model="isOpen" />

  <button @click="isOpen = true"> Open dialog </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Dialog from "@/components/TheDialog.vue";

const isOpen = ref(false);
</script>