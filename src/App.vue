<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    <hr />
    <form @submit.prevent="cobalogin">
      <input type="text" name="username" id="username" v-model="username" />
      <input type="text" name="password" id="password" v-model="password" />
      <button>Kirim</button>
    </form>
    <hr />
    <form @submit.prevent="cobaregister">
      <input type="text" name="username" id="uname" v-model="username" />
      <input type="text" name="password" id="passwd" v-model="password" />
      <input type="text" name="name" id="name" v-model="name" />
      <input type="file" ref="foto" />

      <button>Kirim</button>
    </form>
    <hr />
    <button @click="mauLogout">Mau Logout</button>
    <button @click="currentToken">Current Token</button>
    <hr />
    <button @click="randomBlog">Random Blog</button>
    <button @click="getAllBlogs">Get All Blog</button>
    <br />
    <input v-model="id" />
    <button @click="getBlog">Get Blog</button>
    <br />
    <input type="text" name="token" id="token" v-model="token" />
    <button @click="addBlog">Add Blog Token Otomatis</button>
    <button @click="addBlogManual">Add Blog Token Manual</button>
    <hr />
    <input
      type="text"
      name="blog"
      id="blog"
      v-model="blogId"
      placeholder="id"
    />
    <button @click="editBlog">Edit Blog Token Otomatis</button>
    <hr />
    <input type="file" name="file" id="file" ref="fotoBlog" />
    <input
      type="text"
      name="blog"
      id="blog-id-foto"
      v-model="blogId"
      placeholder="id"
    />
    <button @click="ubahFoto">Ubah Foto</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    username: "",
    password: "",
    name: "",
    id: 0,
    token: "",
    blogId: 0,
  }),
  methods: {
    async currentToken() {
      const data = await this.$auth.getCurrentToken();
      console.dir(data);
    },
    async cobalogin() {
      const result = await this.$auth.login({
        email: this.username,
        password: this.password,
      });

      console.dir(result);
      this.token = result;
    },
    async cobaregister() {
      const result = await this.$auth.register({
        email: this.username,
        password: this.password,
        name: this.name,
        photo_profile: this.$refs.foto.files[0],
      });

      console.dir(result);
    },
    async mauLogout() {
      const result = await this.$auth.logout();
      console.dir(result);
    },
    async randomBlog() {
      const result = await this.$blog.getRandomBlogs(3);
      console.dir(result);
    },
    async getAllBlogs() {
      const result = await this.$blog.getAllBlogs(1);
      console.dir(result);
    },
    async getBlog() {
      const result = await this.$blog.getBlog(this.id);
      console.dir(result);
    },
    async addBlog() {
      const result = await this.$blog.addPost({
        title: "Testing aja",
        description: "Ini adalah tes",
      });
      console.dir(result);
    },
    async addBlogManual() {
      const result = await this.$blog.addPost(
        {
          title: "Testing aja",
          description: "Ini adalah tes",
        },
        this.token
      );
      console.dir(result);
    },
    async editBlog() {
      const data = {
        id: this.blogId,
        title: "Testing aja (Edit)",
        description: "Ini adalah tes (Edit)",
      };

      const result = await this.$blog.editPost(data);
      console.dir(result);
    },
    async ubahFoto() {
      const file = this.$refs.fotoBlog.files[0];

      const result = await this.$blog.uploadPhoto({
        id: this.blogId,
        photo: file,
      });

      console.dir(result);
    },
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
