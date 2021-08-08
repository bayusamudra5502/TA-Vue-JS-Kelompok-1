<template>
  <el-header>
    <div class="container">
      <div class="title">
        <router-link to="/">
          <img src="@/assets/header-logo.svg" alt="logo" />
        </router-link>
      </div>
      <div class="nav">
        <div class="editor" v-if="isEditor">
          <el-button
            type="text"
            style="margin: 0 10px"
            @click="showBlog"
            v-if="isEditMode"
            >Lihat Artikel</el-button
          >
          <el-button type="primary" @click="onAction" :loading="loading">{{
            isEditMode ? "Update" : "Publish"
          }}</el-button>
        </div>
        <navlink to="/" :isActive="true" v-if="!isEditor">Home</navlink>
        <navlink to="/posts" v-if="!isEditor">Blogs</navlink>
        <navlink to="/about" v-if="!isEditor">Tentang Kami</navlink>

        <div class="btn-login" v-if="!isLogged">
          <el-button type="primary" @click="goToLogin"> Login </el-button>
        </div>

        <el-dropdown @command="action" v-if="isLogged">
          <div class="avatar">
            <img :src="photoProfile" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :disabled="true">
              <b>Active User</b>
            </el-dropdown-item>
            <el-dropdown-item :disabled="true">
              {{ name }}
            </el-dropdown-item>
            <el-dropdown-item command="add" v-if="!isEditor" :divided="true">
              Tambah Post
            </el-dropdown-item>
            <el-dropdown-item command="home" v-if="isEditor">
              Home
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
      name: "auth/name",
    }),
  },
  props: {
    isEditor: Boolean,
    isEditMode: Boolean,
    loading: Boolean,
  },
  methods: {
    ...mapActions({
      destroySession: "auth/resetUser",
    }),
    async action(cmd) {
      if (cmd === "add") {
        this.$router.push("/posts/add");
      } else if (cmd === "profile") {
        this.$router.push("/profile");
      } else if (cmd === "home") {
        this.$router.push("/");
      } else {
        try {
          await this.$auth.logout();

          this.destroySession();
          this.$message({
            message: "Berhasil Logout",
            type: "success",
            showClose: true,
          });

          this.$router.push("/");
        } catch (err) {
          console.dir(err);
          this.$message.error("Gagal melakukan logout");
        }
      }
    },
    goToLogin() {
      this.$router.push("/login");
    },
    onAction() {
      this.$emit("submit", false);
    },
    showBlog() {
      this.$emit("submit", true);
    },
  },
};
</script>