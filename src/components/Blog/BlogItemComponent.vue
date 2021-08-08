<template>
  <el-card class="box-card" shadow="hover" style="margin-bottom: 10px">
    <div class="content">
      <h2>
        <router-link :to="'/posts/' + blog.id">{{ blog.title }}</router-link>
      </h2>
      <p>
        {{
          blog.description.length > 100
            ? `${blog.description.substring(0, 100)}...`
            : blog.description
        }}
      </p>
      <div class="footer-artikel">
        <div class="date">
          <img src="@/assets/calendar.png" />
          <p>{{ lastModified }}</p>
        </div>
        <div v-if="isLogged">
          <router-link :to="'/posts/' + blog.id + '/edit'">
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
    </div>
    <div class="image">
      <router-link :to="`/posts/${blog.id}`">
        <img :src="photo" :alt="`Foto ${blog.title}`" />
      </router-link>
    </div>
  </el-card>
</template>

<script>
import "../../style/component/blogItem.scss";
import defaultImg from "@/assets/sq-default.jpg";
import { mapGetters } from "vuex";

export default {
  computed: {
    photo() {
      if (this.blog.photo) {
        return this.blog.photo;
      } else {
        return defaultImg;
      }
    },
    ...mapGetters({
      isLogged: "auth/isLogged",
    }),
    lastModified() {
      return new Intl.DateTimeFormat("id", {
        dateStyle: "long",
      }).format(this.blog.date);
    },
  },
  methods: {
    async deleteBlog() {
      try {
        await this.$blog.deleteBlog(this.blog.id);
        this.$message.success("Artikel berhasil dihapus");
        this.$emit("delete");
      } catch {
        this.$message.error("Terjadi kesalahan saat menghapus data");
      }
    },
  },
  props: ["blog"],
};
</script>