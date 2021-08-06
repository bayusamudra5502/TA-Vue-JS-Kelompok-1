<template>
  <el-header>
    <div class="container">
      <div class="title">
        <router-link to="/">
          <img src="@/assets/header-logo.svg" />
        </router-link>
      </div>
      <div class="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/blogs">Blogs</router-link>
        <el-dropdown>
          <div class="avatar"></div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>Profile</el-dropdown-item>
            <el-dropdown-item>Logout</el-dropdown-item>
            <el-dropdown-item divided>About Us</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </el-header>
</template>

<script>
export default {
  props: {
    login: Boolean,
  },
};
</script>