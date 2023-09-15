<template>
  <Transition :duration="300">
    <div 
      v-show="props.modelValue" 
      v-focus-trap="props.modelValue" 
      :aria-hidden="props.modelValue" 
      class="dialog" 
      @keydown.esc="closeDialog"
    >
      <div class="dialog__backdrop" tabindex="-1" @click.self="closeDialog">
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
  --color-primary: rgb(25 118 210);

  box-sizing: border-box;
}
.dialog__backdrop {
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
  box-sizing: border-box;
}

.dialog__button:active {
  transform: scale(0.96);
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
  border: 1px solid transparent;
}

.dialog__button--blank {
  background-color: transparent;
  color: var(--color-primary);
}

.dialog__button--blank:hover {
  border-color: var(--color-primary);
}

.dialog__button--default {
  background-color: var(--color-primary);
  color: #ffffff;
}

.dialog__button--default:hover {
  background-color: rgb(9 89 168);
}

.v-enter-active .dialog__backdrop,
.v-leave-active .dialog__backdrop {
  transition: opacity 300ms ease-in-out;
}

.v-enter-active .dialog__container {
  transition: transform 200ms 100ms ease-out, opacity 300ms ease-in-out;
}

.v-leave-active .dialog__container {
  transition: transform 300ms ease-out, opacity 300ms ease-in-out;
}

.v-enter-from .dialog__backdrop,
.v-leave-to .dialog__backdrop {
  opacity: 0;
}

.v-enter-from .dialog__container,
.v-leave-to .dialog__container {
  transform: translateY(50px);
  opacity: 0;
}
</style>
