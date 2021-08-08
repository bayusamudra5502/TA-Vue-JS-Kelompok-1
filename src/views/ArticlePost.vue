<template>
  <page-container>
    <el-skeleton :loading="isLoading" animated>
      <template slot="template">
        <el-skeleton-item
          variant="image"
          class="bigimage-skeleton"
          style="height: 100px"
        />
        <div class="container article">
          <el-skeleton-item variant="h1" class="title-skeleton" />
          <el-skeleton-item variant="image" class="image-skeleton" />
          <el-skeleton-item variant="text" class="content-skeleton" />
          <el-skeleton-item variant="text" class="content-skeleton" />
          <el-skeleton-item variant="text" class="content-skeleton" />
          <el-skeleton-item variant="text" class="content-skeleton" />
        </div>
      </template>
      <template>
        <div class="bigimage">
          <img :src="bigImg" />
          <div class="overlay"></div>
        </div>
        <div>
          <div class="container article post">
            <h1>{{ data.title }}</h1>
            <div class="data-article">
              <div class="date">
                <div>
                  <img src="@/assets/calendar.png" />
                </div>
                <p>{{ lastModified }}</p>
              </div>
              <div v-if="isLogged">
                <router-link :to="'/posts/' + id + '/edit'">
                  <img src="@/assets/edit.svg" alt="Edit" />
                </router-link>
                <el-popconfirm
                  confirm-button-text="Ya"
                  cancel-button-text="Tidak"
                  icon="el-icon-info"
                  icon-color="red"
                  title="Apakah anda yakin menghapus artikel ini?"
                  @confirm="deleteBlog"
                >
                  <el-button type="text" slot="reference">
                    <img src="@/assets/delete.svg" alt="Delete" />
                  </el-button>
                </el-popconfirm>
              </div>
            </div>
            <div class="article-photo">
              <img
                :src="data.img"
                :alt="'Gambar Artikel ' + data.title"
                v-if="data.img !== null"
              />
            </div>
            <div class="article-post">
              <template v-for="(line, lineKey) in data.description.split('\n')">
                <p :key="lineKey" v-if="line">
                  {{ line }}
                </p>
              </template>
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </page-container>
</template>

<script>
import "@/style/page/article.scss";
import PageContainer from "../components/PageContainer.vue";
import defaultImg from "@/assets/article.jpg";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data: () => ({
    data: {
      title: "",
      img: null,
      date: new Date(),
      description: "",
    },
    isLoading: false,
  }),
  computed: {
    ...mapGetters({
      isLogged: "auth/isLogged",
    }),
    bigImg() {
      if (this.data.img) {
        return this.data.img;
      } else {
        return defaultImg;
      }
    },
    lastModified() {
      return new Intl.DateTimeFormat("id", {
        dateStyle: "long",
      }).format(this.data.date);
    },
    id() {
      return this.$route.params.id;
    },
  },
  components: {
    "page-container": PageContainer,
  },
  methods: {
    async deleteBlog() {
      try {
        await this.$blog.deleteBlog(this.id);

        this.$message.success("Berhasil menghapus artikel");
        this.$router.push("/posts");
      } catch (err) {
        console.dir(err);
        this.$message.error("Gagal mengambil data");
      }
    },
    async updateData() {
      this.isLoading = true;

      try {
        const post = await this.$blog.getBlog(this.id);

        this.data.title = post.title;
        this.data.img = post.photo;
        this.data.date = post.created_at;
        this.data.description = post.description;

        document.title = `${this.data.title} - Bloggque`;
      } catch (err) {
        this.$notify.error({
          title: "Kesalahan",
          message: "Terjadi kesalahan saat mengambil pesan",
        });
      }

      this.isLoading = false;
    },
  },
  async mounted() {
    await this.updateData();
  },
};
</script>

<style>
</style>