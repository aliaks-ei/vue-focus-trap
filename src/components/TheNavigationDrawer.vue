<template>
  <Transition :duration="300">
    <div 
      v-if="props.modelValue" 
      v-focus-trap="props.modelValue" 
      :aria-hidden="props.modelValue" 
      class="navigation-drawer" 
      @keydown.esc="closeNavigationDrawer"
    >
      <div class="backdrop" tabindex="-1" @click.self="closeNavigationDrawer">
        <div class="navigation-drawer__container" role="dialog" aria-modal="true" aria-labelledby="navigation-drawer-title">
          <!-- Header -->
          <header class="navigation-drawer__header">
            <h2 class="navigation-drawer__title" id="navigation-drawer-title"> Navigation </h2>
            <button 
              class="button button--blank navigation-drawer__close-button" 
              aria-label="Close navigation drawer" 
              @click="closeNavigationDrawer"
            ></button>
          </header>

          <!-- Content -->
          <div class="navigation-drawer__content">
            <nav>
              <ul class="navigation-drawer__list">
                <li v-for="link in links" :key="link.title" class="navigation-drawer__list-item">
                  <a class="navigation-drawer__list-item-link" :href="link.href"> {{ link.title }} </a>
                </li>
              </ul>
            </nav>
          </div>

          <!-- Footer -->
          <footer class="navigation-drawer__footer">
            <button 
              class="button button--blank" 
              aria-label="Close navigation drawer" 
              @click="closeNavigationDrawer"
            >
              Close
            </button>
          </footer>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import vFocusTrap from "@/focusTrap";

type Link = {
  title: string;
  href: string;
}

type Props = {
  modelValue: boolean
}

type Emits = {
  (event: "update:modelValue", value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const links = ref<Link[]>([
  { title: "Home", href: "#home" },
  { title: "About", href: "#about" },
  { title: "Users", href: "#users" },
  { title: "Settings", href: "#settings" },
  { title: "Contacts", href: "#contacts" },
]);

const closeNavigationDrawer = () => {
  emit("update:modelValue", false);
}
</script>

<style scoped>
.navigation-drawer__container {
  position: absolute;
  bottom: 0;
  max-height: 90vh;
  width: 100%;
  overflow-y: auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

.navigation-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
}

.navigation-drawer__title {
  margin: 0;
}

.navigation-drawer__close-button {
  font-size: 1rem;
  line-height: 1;
  padding: 6px 8px;
  color: #000000;
}

.navigation-drawer__close-button::before {
  content: "\2715";
}

.navigation-drawer__content {
  flex-grow: 1;
  padding-top: 24px;
  padding-bottom: 24px;
}

.navigation-drawer__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.navigation-drawer__list-item {
  padding-left: 8px;
  padding-right: 8px;
}

.navigation-drawer__list-item-link {
  display: block;
  padding: 12px 16px;
  color: #212121;
  text-decoration: none;
}

.navigation-drawer__list-item-link:visited {
  color: var(--color-primary);
}

.navigation-drawer__list-item:hover {
  background-color: #EEEEEE;
}

.navigation-drawer__list-item:hover .navigation-drawer__list-item-link,
.navigation-drawer__list-item-link:focus {
  text-decoration: underline;
  color: inherit;
}

.navigation-drawer__list-item .navigation-drawer__list-item-link:active {
  color: #424242;
}

.navigation-drawer__footer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 24px;
}

.navigation-drawer__footer .button {
  flex-grow: 1;
}

.v-enter-active .navigation-drawer__container {
  transition: transform 200ms 100ms cubic-bezier(.4, 0, .2, 1), opacity 300ms ease-in;
}

.v-leave-active .navigation-drawer__container {
  transition: transform 300ms cubic-bezier(.4, 0, .2, 1), opacity 300ms ease-in;
}

.v-enter-from .navigation-drawer__container,
.v-leave-to .navigation-drawer__container {
  transform: translateY(100%);
  opacity: 0;
}

@media (min-width: 600px) {
  .navigation-drawer__container {
    left: 0;
    height: 100vh;
    max-height: 100vh;
    max-width: 500px;
    width: 100%;
  }

  .v-enter-from .navigation-drawer__container,
  .v-leave-to .navigation-drawer__container {
    transform: translateX(-100%);
    opacity: 0;
  }
}
</style>
