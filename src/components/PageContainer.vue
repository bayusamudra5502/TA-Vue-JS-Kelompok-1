<template>
  <div>
    <header-app
      :isEditMode="isEditMode"
      :isEditor="isEditor"
      @action="$emit('action')"
    ></header-app>
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
  props: {
    isEditor: Boolean,
    isEditMode: Boolean,
  },
};
</script>
