<template>
  <Transition name="fade">
    <div 
      v-show="props.modelValue" 
      v-focus-trap="props.modelValue" 
      :aria-hidden="props.modelValue" 
      class="dialog" 
      @keydown.esc="closeDialog"
    >
      <div class="dialog__overlay" tabindex="-1" @click.self="closeDialog">
        <div class="dialog__container" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
          <!-- Header -->
          <header class="dialog__header">
            <h2 class="dialog__title" id="dialog-title"> Dialog </h2>
            <button class="dialog__button dialog__button--close" aria-label="Close dialog" @click="closeDialog"></button>
          </header>

          <!-- Content -->
          <div class="dialog__content">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
              Accusantium laboriosam ipsum blanditiis tempora accusamus quod saepe quis, 
              consequuntur architecto sequi provident ut soluta molestias veniam unde! 
              Nam nulla ratione sapiente!
            </p>
          </div>

          <!-- Footer -->
          <footer class="dialog__footer">
            <button 
              class="dialog__button dialog__button--action dialog__button--blank" 
              aria-label="Close dialog" 
              @click="closeDialog"
            >
              Close
            </button>
            <button class="dialog__button dialog__button--action dialog__button--default"> 
              Continue 
            </button>
          </footer>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import vFocusTrap from "@/focusTrap";

type Props = {
  modelValue: boolean
}

type Emits = {
  (event: "update:modelValue", value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const closeDialog = () => {
  emit("update:modelValue", false);
}
</script>

<style scoped>
.dialog {
  --color-primary: #1976d2;

  box-sizing: border-box;
}
.dialog__overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0 0 0 / 70%);
}

.dialog__container {
  max-height: 100vh;
  max-width: 500px;
  overflow-y: auto;
  padding: 24px;
  border-radius: 4px;
  background-color: #ffffff;
}

.dialog__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dialog__title {
  margin: 0;
}

.dialog__content {
  margin-top: 16px;
  margin-bottom: 16px;
}

.dialog__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.dialog__button {
  cursor: pointer;
  border: none;
}

.dialog__button--close {
  font-size: 1rem;
  line-height: 1;
  padding: 6px 8px;
  background-color: transparent;
}

.dialog__button--close::before {
  content: "\2715";
}

.dialog__button--action {
  font-size: .875rem;
  padding: 8px 16px;
  border-radius: 4px;
}

.dialog__button--blank {
  background-color: transparent;
  color: var(--color-primary);
}

.dialog__button--default {
  background-color: var(--color-primary);
  color: #ffffff;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
