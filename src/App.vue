<template>
  <section class="container">
    <Teleport to="body">
      <Dialog v-model="isDialogOpen" />
      <NavigationDrawer v-model="isNavigationDrawerOpen" />
    </Teleport>


    <div class="container__content">
      <h1> Vue focus trap directive</h1>

      <div class="container__actions">
        <button 
          class="button button--default" 
          @click="isDialogOpen = true"
        > 
          Open dialog 
        </button>

        <button 
          class="button button--default" 
          @click="isNavigationDrawerOpen = true"
        > 
          Open navigation
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Dialog from "@/components/TheDialog.vue";
import NavigationDrawer from "@/components/TheNavigationDrawer.vue";

const isDialogOpen = ref(false);
const isNavigationDrawerOpen = ref(false);
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  padding: 16px;
}

.container__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
</style>