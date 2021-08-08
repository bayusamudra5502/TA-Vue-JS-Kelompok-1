<template>
  <el-card class="box-card" shadow="hover" style="margin-bottom: 10px">
    <div class="content">
      <h2>
        <router-link :to="'/posts/' + blog.id">{{ blog.title }}</router-link>
      </h2>
      <p>{{ blog.description.substring(0, 100) }}</p>
    </div>
    <div class="image">
      <img :src="blog.photo" />
    </div>
  </el-card>
</template>

<script>
import "../../style/component/blogItem.scss";

export default {
  data: () => ({
    apiDomain: "http://demo-api-vue.sanbercloud.com",
  }),
  props: ["blog"],
};
</script>