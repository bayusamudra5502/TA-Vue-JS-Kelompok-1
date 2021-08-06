<template>
  <div class="auth-page register">
    <auth-card>
      <div class="title">
        <img src="@/assets/header-logo.svg" alt="logo" />
        <h1>Register</h1>
      </div>
      <el-form :model="answer" :rules="rules">
        <el-form-item prop="name" label="Nama">
          <el-input
            placeholder="Masukkan Email"
            id="name"
            name="name"
            v-model="answer.name"
          />
        </el-form-item>
        <el-form-item prop="email" label="Email">
          <el-input
            placeholder="Masukkan Email"
            id="email"
            name="email"
            v-model="answer.email"
            type="email"
          />
        </el-form-item>
        <el-form-item prop="password" label="Password">
          <el-input
            id="password"
            placeholder="Masukkan Email"
            name="password"
            v-model="answer.password"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item prop="passwordVerify" label="Verifikasi Password">
          <el-input
            id="password-verify"
            placeholder="Masukkan Kembali Password anda"
            name="password"
            v-model="answer.passwordVerify"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item prop="file" label="Upload Photo Profile">
          <el-upload
            class="upload-demo"
            drag
            ref="picture"
            action=""
            accept="image/*"
            :auto-upload="false"
            :limit="1"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              Drop foto disini atau <em>klik untuk upload</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              File harus bertipe gambar
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item class="form-action">
          <el-button type="primary">Daftar</el-button>
        </el-form-item>
      </el-form>
      <div class="back">
        <router-link to="/login">
          <span class="el-icon-arrow-left" /> Kembali ke Halaman
          Login</router-link
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
      passwordVerify: "",
      name: "",
    },
    rules: {
      name: [
        { required: true, message: "Silahkan isi nama anda", trigger: "blur" },
      ],
      email: [
        { required: true, message: "Silahkan isi email anda", trigger: "blur" },
        {
          type: "email",
          message: "Email yang anda masukan tidak valid",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "Silahkan isi password anda",
          trigger: "blur",
        },
        {
          min: 8,
          message: "Panjang password minimal adalah 8 karakter",
          trigger: "blur",
        },
      ],
      passwordVerify: [
        {
          required: true,
          message: "Silahkan isi verifikasi Password",
        },
        {
          validator(_, value, callback) {
            if (value !== this.answer.password) {
              callback(new Error("Password tidak sama"));
            } else {
              callback();
            }
          },
          trigger: "blur",
        },
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