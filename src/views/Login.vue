<template>
  <div class="auth-page">
    <auth-card>
      <div class="title">
        <img src="@/assets/header-logo.svg" alt="logo" />
        <h1>Login Area</h1>
      </div>
      <el-form :model="answer" :rules="validate">
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
          <el-button type="primary">Login</el-button>
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

export default {
  data: () => ({
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
    goToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>