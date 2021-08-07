<template>
  <page-container>
    <div class="home">
      <p>Ini Home yaa</p>
    </div>
  </page-container>
</template>

<script>
import PageContainer from "../components/PageContainer.vue";

export default {
  name: "Home",
  components: {
    "page-container": PageContainer,
  },
  mounted() {
    document.title = "Halaman Utama - Bloggque";
  },
};
</script>
