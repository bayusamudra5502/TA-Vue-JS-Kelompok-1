<template>
  <el-container>
    <app-header></app-header>
  </el-container>
</template>

<script>
import appHeader from "./components/Header.vue";
export default {
  components: {
    "app-header": appHeader,
  },
  methods: {
    login() {
      this.$auth.login({
        username: "...",
        password: "...",
      });
    },
  },
};
</script>