<script setup lang="ts">
import {FwbButton, FwbNavbar, FwbNavbarCollapse, FwbNavbarLink, FwbNavbarLogo} from "flowbite-vue";
import {RouterLink, RouterView} from "vue-router";
import {useUserStore} from "./app/modules/user/store/user-store.ts";

defineOptions({
  name: 'App'
})

const userStore = useUserStore();

</script>

<template>
  <nav class="custom-navbar">
    <div class="custom-navbar-log">
      <RouterLink class="custom-navbar-brand-link" to="/">
        <img class="custom-logo" src="./assets/vue.svg" alt="logo" />
        <span class="custom-brand"> Challenge</span>
      </RouterLink>
      <div class="custom-navbar-menu">
        <ul class="custom-navbar-menu-container">
          <li>
            <RouterLink class="custom-navbar-menu-item" to="/zip-code-searcher">
              Zip code searcher
            </RouterLink>
          </li>
          <li v-if="userStore.user.id !== undefined">
            <RouterLink class="custom-navbar-menu-item" @click="userStore.logout()" to="#">
              Logout ({{userStore.user.name}})
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <main class="p-2">
    <RouterView />
  </main>
</template>

<style scoped>
</style>
