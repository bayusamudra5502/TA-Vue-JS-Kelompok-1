<template>
  <page-container>
    <div class="jumbotron-container">
      <div class="home container">
        <div class="jumbotron">
          <div>
            <div class="halo">Halo</div>
            <div style="font-size: 60px; margin-bottom: 20px">
              Selamat Datang
            </div>
            <div style="font-size: 20px">
              Temukan kisah-kisah menginspirasi di Bloggque
            </div>
          </div>
          <div class="img">
            <img src="@/assets/jumbotron.png" style="height: 100%" />
          </div>
        </div>
      </div>
    </div>
    <div class="home container">
      <div style="width: 100%">
        <div class="small-title">Artikel Terbaru</div>
      </div>

      <el-col :span="24">
        <blog-item-component
          v-for="blogEmpat in blogsEmpat"
          :key="`blog-` + blogEmpat.id"
          :blog="blogEmpat"
          @delete="getEmpat"
        ></blog-item-component>
      </el-col>

      <el-col :span="24">
        <div class="small-title">Artikel Random</div>
      </el-col>

      <el-col :span="24">
        <blog-item-component
          v-for="blogRandom in blogsRandom"
          :key="`blog-` + blogRandom.id"
          :blog="blogRandom"
          @delete="getRandom"
        ></blog-item-component>
      </el-col>
    </div>
  </page-container>
</template>
<style>
.halo {
  font-size: 25px;
  color: #e97356;
  margin-bottom: 20px;
  display: inline-block;
  border-bottom: 3.5px solid #e97356;
  padding-bottom: 2px;
}
</style>

<script>
import "@/style/page/home.scss";
import PageContainer from "../components/PageContainer.vue";
import BlogItemComponentVue from "../components/Blog/BlogItemComponent.vue";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    blogsEmpat: [],
    blogsRandom: [],
    isBlogsLoading: false,
    isRandomsLoading: false,
  }),
  name: "Home",
  components: {
    "page-container": PageContainer,
    "blog-item-component": BlogItemComponentVue,
  },
  computed: {
    ...mapGetters({
      isLogged: "auth/isLogged",
    }),
  },
  methods: {
    async getEmpat() {
      try {
        this.blogsEmpat = (await this.$blog.getAllBlogs()).data;
      } catch (err) {
        console.dir(err);
      }
    },
    async getRandom() {
      this.blogsRandom = await this.$blog.getRandomBlogs(4);
      //console.dir(blogsEmpat);
    },
  },
  created() {
    this.getEmpat();
    this.getRandom();
  },
  mounted() {
    document.title = "Halaman Utama - Bloggque";
  },
};
</script>
