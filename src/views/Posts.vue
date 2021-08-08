<template>
  <page-container>
    <div class="home">
      <el-row style="margin-bottom: 8px">
        <el-col :span="12" :offset="4">
          <div class="halo">Halaman</div>
          <div style="font-size: 60px">Daftar Artikel</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :offset="4">
           <blog-item-component  v-for="blog in blogsAll" :key="`blog-`+blog.id" :blog="blog"></blog-item-component>
        </el-col>
      </el-row>
      <el-pagination
         v-model="page" 
        :page-size="4"
        :pager-count="perPage"
        layout="prev, pager, next"
        :total="lengthPage">
      </el-pagination>
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
    color: #E97356;
    margin-bottom: 20px; 
    padding-top: 100px;
    display :inline-block;
    border-bottom:5px solid #E97356;
    padding-bottom:2px;
  }
  .artikel-terbaru {
    font-size: 30px;
    margin-bottom: 20px; 
    padding-top: 100px;
    display :inline-block;
    border-bottom:5px solid black;
    padding-bottom:2px;
  }
</style>

<script>
import PageContainer from "../components/PageContainer.vue";
import BlogItemComponentVue from '../components/Blog/BlogItemComponent.vue';

export default {
  data: () => ({
    blogsAll : [],
    page : 0,
    lengthPage : 0,
    perPage : 0
  }),
  name: "Home",
  components: {
    "page-container": PageContainer,
    "blog-item-component" : BlogItemComponentVue
  },
  methods:{
    async getAll(){
      try {
        this.blogsAll = (await this.$blog.getAllBlogs()).data;
        console.log((await this.$blog.getAllBlogs()))
        // this.blogsAll = blogs;
        this.page = (await this.$blog.getAllBlogs()).current_page;
        this.lengthPage = (await this.$blog.getAllBlogs()).last_page
        this.perPage = (await this.$blog.getAllBlogs()).data.length;
      } catch (err) {
        console.dir(err);
      }
    },
  },
   created(){
    this.getAll();
  },
  mounted() {
    document.title = "Daftar Artikel - Bloggque";
  },
};
</script>
