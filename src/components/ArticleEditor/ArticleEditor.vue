<template>
  <div class="container article">
    <textarea-autosize
      class="title"
      placeholder="Judul Artikel"
      v-model="title"
    />
    <img
      :src="img"
      class="content-image"
      alt="Article Image"
      v-if="img !== null && isEditMode"
    />
    <el-upload
      class="upload-picture"
      drag
      action=""
      v-if="img !== null && isEditMode"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        Drop gambar disini atau <em>click untuk menambahkan gambar </em>
      </div>
      <div class="el-upload__tip" slot="tip">
        jpg/png files with a size less than 500kb
      </div>
    </el-upload>
    <textarea-autosize
      class="content"
      placeholder="Tulis sesuatu disini..."
      v-model="content"
    ></textarea-autosize>
  </div>
</template>

<script>
import "../../style/page/article.scss";

export default {
  name: "Home",
  data: () => ({
    title: "",
    content: "",
    img: null,
  }),
  props: {
    isEditMode: Boolean,
    id: String,
  },
  methods: {},
};
</script>

<style>
</style>