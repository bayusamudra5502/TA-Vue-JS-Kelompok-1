<template>
  <div class="auth-page">
    <auth-card>
      <div class="title">
        <img src="@/assets/header-logo.svg" alt="logo" />
        <h1>Login Area</h1>
      </div>
      <el-alert
        title="Gagal Login"
        type="error"
        description="Pasangan Email dan Password tidak ditemukan"
        show-icon
        style="margin: 10px 0"
        v-if="status.isUnauthorized"
      >
      </el-alert>
      <el-form ref="form" :model="answer" :rules="validate">
        <el-form-item label="Email" prop="email">
          <el-input
            placeholder="Masukkan Email"
            id="email"
            name="email"
            v-model="answer.email"
            type="email"
          />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            id="password"
            placeholder="Masukkan Email"
            name="password"
            v-model="answer.password"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item class="form-action">
          <el-button type="text" @click="goToRegister">Daftar</el-button>
          <el-button type="primary" @click="submit" :loading="status.isLoading"
            >Login</el-button
          >
        </el-form-item>
      </el-form>
      <div class="back">
        <router-link to="/">
          <span class="el-icon-arrow-left" /> Kembali ke Halaman
          Utama</router-link
        >
      </div>
    </auth-card>
  </div>
</template>

<script>
import "../style/page/auth.scss";
import AuthCard from "../components/memberArea/AuthCard.vue";
import { mapActions } from "vuex";

export default {
  data: () => ({
    status: {
      isUnauthorized: false,
      isLoading: false,
    },
    answer: {
      email: "",
      password: "",
    },
    validate: {
      email: [
        { required: true, message: "Masukkan email anda", trigger: "blur" },
        {
          type: "email",
          message: "Email yang anda masukan tidak valid",
          trigger: "blur",
        },
      ],
      password: [
        { required: true, message: "Masukkan email anda", trigger: "blur" },
      ],
    },
  }),
  components: {
    "auth-card": AuthCard,
  },
  methods: {
    ...mapActions({ setUser: "auth/setUser" }),
    goToRegister() {
      this.$router.push("/register");
    },
    submit() {
      this.status.isLoading = true;
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const data = {
            email: this.answer.email,
            password: this.answer.password,
          };

          try {
            const token = await this.$auth.login(data);
            const userData = await this.$auth.getUserDetails(token);

            this.status.isUnauthorized = false;
            this.$message({
              message: "Login Sukses",
              type: "success",
              showClose: true,
            });
            this.$router.push("/");
            this.setUser({
              token,
              data: userData,
            });
          } catch (err) {
            console.dir(err);
            if (err?.isUnauthorized()) {
              this.status.isUnauthorized = true;
            } else {
              console.dir(err);
              this.$message.error("Terjadi kesalahan saat proses login.");
            }
          }

          this.status.isLoading = false;
        } else {
          this.status.isLoading = false;
          return false;
        }
      });
    },
  },
  mounted() {
    document.title("Login Area - Bloggque");
  },
};
</script>