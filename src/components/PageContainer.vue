<template>
  <div>
    <header-app
      :isEditMode="isEditMode"
      :isEditor="isEditor"
      @action="$emit('action')"
    ></header-app>
    <div class="content content-app">
      <slot />
    </div>
    <footer-app />
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default {
  components: {
    "header-app": Header,
    "footer-app": Footer,
  },
  props: {
    isEditor: Boolean,
    isEditMode: Boolean,
  },
};
</script>
