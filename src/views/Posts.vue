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
          <blog-item-component v-for="blog in blogsAll" :key="`blog-`+blog.id" :blog="blog"></blog-item-component>
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
  }),
  name: "Home",
  components: {
    "page-container": PageContainer,
    "blog-item-component" : BlogItemComponentVue
  },
  methods:{
    async getAll(){
      this.blogsAll = await  this.$blog.getAllBlogs();
      console.log(this.blogsAll);
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
