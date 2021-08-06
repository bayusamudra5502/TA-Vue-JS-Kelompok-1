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

        <div class="btn-login" v-if="!isLogged">
          <el-button type="primary" @click="goToLogin"> Login </el-button>
        </div>

        <el-dropdown @command="action" v-if="isLogged">
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
import { mapActions, mapGetters } from "vuex";
import Navlink from "./Navlink.vue";

export default {
  components: {
    navlink: Navlink,
  },
  computed: {
    ...mapGetters({
      isLogged: "auth/isLogged",
      photoProfile: "auth/photoProfile",
    }),
  },
  methods: {
    ...mapActions({
      destroySession: "auth/resetUser",
    }),
    async action(cmd) {
      if (cmd === "add") {
        this.$router.push("/blogs/add");
      } else if (cmd === "profile") {
        this.$router.push("/profile");
      } else {
        try {
          await this.$auth.logout();

          this.destroySession();
          this.$message({
            message: "Berhasil Logout",
            type: "success",
            showClose: true,
          });
        } catch (err) {
          console.dir(err);
          this.$message.error("Gagal melakukan logout");
        }
      }
    },
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>