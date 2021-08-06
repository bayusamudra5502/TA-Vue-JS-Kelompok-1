<template>
  <div>
    <header-app></header-app>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";

export default {
  components: {
    "header-app": Header,
  },
};
</script>
