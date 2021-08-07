<template>
  <div class="auth-page register">
    <auth-card>
      <div class="title">
        <img src="@/assets/header-logo.svg" alt="logo" />
        <h1>Register</h1>
      </div>
      <el-alert
        title="Gagal Register"
        type="error"
        description="Anda telah mendaftar sebelumnya. Silahkan lakukan login."
        show-icon
        style="margin: 10px 0"
        v-if="state.isUserAvailable"
      >
      </el-alert>
      <el-form :model="answer" :rules="rules" ref="form">
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
        <el-form-item prop="profileForm" label="Upload Photo Profile">
          <el-upload
            class="upload-demo"
            drag
            action=""
            accept="image/*"
            ref="profile"
            :auto-upload="false"
            :limit="1"
            :http-request="addFile"
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
          <el-button type="primary" @click="submit" :loading="state.isLoading"
            >Daftar</el-button
          >
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
  data() {
    return {
      state: {
        isLoading: false,
        isUserAvailable: false,
      },
      answer: {
        email: "",
        password: "",
        passwordVerify: "",
        name: "",
        file: null,
      },
      rules: {
        name: [
          {
            required: true,
            message: "Silahkan isi nama anda",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "Silahkan isi email anda",
            trigger: "blur",
          },
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
            validator: (_, value, callback) => {
              if (value !== this.answer.password) {
                callback(new Error("Password tidak sama"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        profileForm: [
          {
            validator: (_, __, callback) => {
              if (this.answer.file !== null) {
                callback();
              } else {
                callback(new Error("Silahkan masukan foto profil"));
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {
    "auth-card": AuthCard,
  },
  methods: {
    goToRegister() {
      this.$router.push("/register");
    },
    addFile({ file }) {
      this.answer.file = file;
    },
    submit() {
      this.state.isUserAvailable = false;

      this.$refs.profile.submit();
      this.isLoading = true;
      this.$refs.form.validate(async (success) => {
        if (success) {
          const data = {
            name: this.answer.name,
            email: this.answer.email,
            password: this.answer.password,
            photo_profile: this.answer.file,
          };

          try {
            await this.$auth.register(data);

            this.$notify({
              title: "Berhasil",
              message: "Selanjutnya, silahkan lakukan login",
              type: "success",
            });
            this.$router.push("/login");
          } catch (err) {
            if (err?.isEmailAvailable()) {
              this.state.isUserAvailable = true;
            } else {
              console.dir(err);
              this.$message.error("Terjadi kesalahan saat proses login.");
            }
          }

          this.isLoading = false;
        } else {
          this.isLoading = false;
          return false;
        }
      });
    },
  },
  mounted() {
    document.title("Register Area - Bloggque");
  },
};
</script>