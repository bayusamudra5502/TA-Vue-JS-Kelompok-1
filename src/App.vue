<template>
  <router-view></router-view>
</template>

<script>
export default {
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