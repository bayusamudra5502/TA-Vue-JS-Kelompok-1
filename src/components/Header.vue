<template>
  <el-header>
    <div class="container">
      <div class="title">
        <router-link to="/">
          <img src="@/assets/header-logo.svg" alt="logo" />
        </router-link>
      </div>
      <div class="nav">
        <navlink to="/" :isActive="true">Home</navlink>
        <navlink to="/blogs">Blogs</navlink>
        <navlink to="/about">Tentang Kami</navlink>

        <el-dropdown @command="action">
          <div class="avatar"></div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="add"> Tambah Post </el-dropdown-item>
            <el-dropdown-item command="profile" divided>
              Profile
            </el-dropdown-item>
            <el-dropdown-item command="logout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </el-header>
</template>

<script>
import Navlink from "./Navlink.vue";

export default {
  components: {
    navlink: Navlink,
  },
  methods: {
    action(cmd) {
      if (cmd === "add") {
        this.$router.push("/blogs/add");
      } else if (cmd === "profile") {
        this.$router.push("/profile");
      } else {
        this.$message({
          message: "Berhasil Logout",
          type: "success",
          showClose: true,
        });
      }
    },
  },
};
</script>