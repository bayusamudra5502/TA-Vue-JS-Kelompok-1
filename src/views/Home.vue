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
        <blog-item-skeleton
          :loading="isBlogsLoading"
          v-for="blogEmpat in blogsEmpat"
          :key="`blog-` + blogEmpat.id"
        >
          <blog-item-component
            :blog="blogEmpat"
            @delete="getEmpat"
          ></blog-item-component>
        </blog-item-skeleton>
      </el-col>

      <el-col :span="24">
        <div class="small-title">Artikel Random</div>
      </el-col>

      <el-col :span="24">
        <blog-item-skeleton
          :loading="isRandomsLoading"
          v-for="blogEmpat in blogsRandom"
          :key="`blog-` + blogEmpat.id"
        >
          <blog-item-component
            :blog="blogEmpat"
            @delete="getEmpat"
          ></blog-item-component>
        </blog-item-skeleton>
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
import BlogItemSkeleton from "../components/Blog/BlogItemSkeleton.vue";
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
    "blog-item-skeleton": BlogItemSkeleton,
  },
  computed: {
    ...mapGetters({
      isLogged: "auth/isLogged",
    }),
  },
  methods: {
    async getEmpat() {
      this.isRandomsLoading = true;
      try {
        this.blogsEmpat = (await this.$blog.getAllBlogs()).data;
      } catch (err) {
        this.$message.error("Terjadi kesalahan saat mendapatkan data");
        console.dir(err);
      }
      this.isRandomsLoading = false;
    },
    async getRandom() {
      this.isRandomsLoading = true;
      try {
        this.blogsRandom = await this.$blog.getRandomBlogs(4);
      } catch (err) {
        this.$message.error("Terjadi kesalahan saat mendapatkan data");
        console.dir(err);
      }
      this.isRandomsLoading = false;
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
