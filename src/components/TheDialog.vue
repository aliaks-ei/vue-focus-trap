<template>
  <Transition :duration="300">
    <div 
      v-if="props.modelValue" 
      v-focus-trap="props.modelValue" 
      :aria-hidden="props.modelValue" 
      class="dialog" 
      @keydown.esc="closeDialog"
    >
      <div class="dialog__backdrop backdrop" tabindex="-1" @click.self="closeDialog">
        <div class="dialog__container" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
          <!-- Header -->
          <header class="dialog__header">
            <h2 class="dialog__title" id="dialog-title"> Dialog </h2>
            <button 
              class="button button--blank dialog__close-button" 
              aria-label="Close dialog" 
              @click="closeDialog"
            ></button>
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
              class="button button--blank" 
              aria-label="Close dialog" 
              @click="closeDialog"
            >
              Close
            </button>
            <button class="button button--default"> 
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
.dialog__backdrop {
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog__container {
  max-height: 100vh;
  max-width: 500px;
  overflow-y: auto;
  padding: 24px;
  margin: 8px;
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

.dialog__close-button {
  font-size: 1rem;
  line-height: 1;
  padding: 6px 8px;
  color: #000000;
}

.dialog__close-button::before {
  content: "\2715";
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

.v-enter-active .dialog__container {
  transition: transform 200ms 100ms ease-out, opacity 300ms ease-in-out;
}

.v-leave-active .dialog__container {
  transition: transform 300ms ease-out, opacity 300ms ease-in-out;
}

.v-enter-from .dialog__container,
.v-leave-to .dialog__container {
  transform: translateY(50px);
  opacity: 0;
}
</style>
