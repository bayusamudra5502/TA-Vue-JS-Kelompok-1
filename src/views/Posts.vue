<template>
  <page-container>
    <div class="jumbotron-container">
      <div class="home container">
        <div class="jumbotron">
          <div>
            <div class="halo">Halaman</div>
            <div style="font-size: 60px; margin-bottom: 20px">
              Daftar Artikel
            </div>
          </div>
          <div class="img">
            <img src="@/assets/jumbo-blogs.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="home container" style="margin-top: 40px">
      <el-col :span="24">
        <blog-item-component
          v-for="blog in blogsAll"
          :key="`blog-` + blog.id"
          :blog="blog"
        ></blog-item-component>
      </el-col>
      <el-row style="margin: 20px 0">
        <el-col :span="18" :offset="4">
          <el-pagination
            v-model="page"
            @current-change="getAll"
            :current-page.sync="current_page"
            :page-size="4"
            layout="prev, pager, next"
            :total="total"
            :hide-on-single-page="true"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </page-container>
</template>
<style>
#home-row {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.halo {
  font-size: 30px;
  color: #e97356;
  margin-bottom: 20px;
  padding-top: 100px;
  display: inline-block;
  border-bottom: 5px solid #e97356;
  padding-bottom: 2px;
}
.artikel-terbaru {
  font-size: 30px;
  margin-bottom: 20px;
  padding-top: 100px;
  display: inline-block;
  border-bottom: 5px solid black;
  padding-bottom: 2px;
}
</style>

<script>
import "@/style/page/home.scss";
import PageContainer from "../components/PageContainer.vue";
import BlogItemComponentVue from "../components/Blog/BlogItemComponent.vue";

export default {
  data: () => ({
    blogsAll: [],
    page: 0,
    current_page: 1,
    lengthPage: 0,
    perPage: 0,
    total: 0,
  }),
  name: "Home",
  components: {
    "page-container": PageContainer,
    "blog-item-component": BlogItemComponentVue,
  },
  methods: {
    async getAll(page) {
      try {
        const response = await this.$blog.getAllBlogs(page);
        this.blogsAll = response.data;
        this.page = response.current_page;
        this.lengthPage = response.last_page;
        this.perPage = response.data.length;
        this.total = response.total;
        this.current_page = response.current_page;
      } catch (err) {
        console.dir(err);
      }
    },
  },
  created() {
    this.getAll();
  },
  mounted() {
    document.title = "Daftar Artikel - Bloggque";
  },
};
</script>
