<template>
  <page-container>
    <div class="home">
      <el-row style="margin-bottom: 8px">
        <el-col :span="12" :offset="4">
          <div class="halo">Halo</div>
          <div style="font-size: 60px">Selamat Datang</div>
          <div style="font-size: 25px">Temukan kisah-kisah menginspirasi di Bloggque</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="4">
          <div class="artikel-terbaru">Artikel Terbaru</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :offset="4">
          <blog-item-component v-for="blogEmpat in blogsEmpat" :key="`blog-`+blogEmpat.id" :blog="blogEmpat"></blog-item-component>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="4">
          <div class="artikel-terbaru">Artikel Random</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :offset="4">
          <blog-item-component v-for="blogRandom in blogsRandom" :key="`blog-`+blogRandom.id" :blog="blogRandom"></blog-item-component>
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
    blogsEmpat : [],
    blogsRandom : []
  }),
  name: "Home",
  components: {
    "page-container": PageContainer,
    "blog-item-component" : BlogItemComponentVue
  },
  methods:{
    async getEmpat(){
      this.blogsEmpat = await  this.$blog.getRandomBlogs(4);
      //console.dir(blogsEmpat);
    },
    async getRandom(){
      this.blogsRandom = await  this.$blog.getRandomBlogs(4);
      //console.dir(blogsEmpat);
    }
  },
   created(){
    this.getEmpat();
    this.getRandom();
  }
};
</script>
