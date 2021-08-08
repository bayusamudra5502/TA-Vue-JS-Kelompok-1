<template>
  <div @keydown.ctrl.83.prevent.stop="onSave">
    <app-header
      :isEditMode="isEditMode"
      :isEditor="true"
      @submit="onSave"
      :loading="isLoadingSubmit"
    />
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
          <div class="container article">
            <textarea-autosize
              class="title"
              placeholder="Judul Artikel"
              v-model="title"
            />
            <p style="font-style: italic; font-size: 0.8em" v-if="isEditMode">
              Terakhir diupdate pada {{ lastModified }}
            </p>
            <div class="editor-photo" v-if="img !== null && isEditMode">
              <img :src="img" class="content-image" alt="Article Image" />
              <div class="overlay">
                <el-button type="text" @click="isDialogOpen = true">
                  Ubah Gambar
                </el-button>
              </div>
            </div>
            <el-upload
              class="upload-picture"
              drag
              action=""
              :http-request="uploadFile"
              v-if="img === null && isEditMode"
              ref="file"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                Drop gambar disini atau <em>click untuk menambahkan gambar</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                File harus bertipe file gambar
              </div>
            </el-upload>
            <div
              v-if="img === null && isUploading"
              style="width: 100%; margin: 10px 0"
            >
              <el-progress
                :percentage="uploadProgress"
                style="width: 100%"
              ></el-progress>
            </div>
            <textarea-autosize
              class="content"
              placeholder="Tulis sesuatu disini..."
              v-model="content"
            ></textarea-autosize>
          </div>
        </div>
      </template>
    </el-skeleton>
    <el-dialog :visible.sync="isDialogOpen" title="Ganti Foto Artikel">
      <el-form>
        <el-upload
          class="upload-picture"
          drag
          action=""
          :http-request="uploadFile"
          :limit="1"
          ref="fileModal"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            Drop <em>atau klik disini</em> untuk upload
          </div>
          <div class="el-upload__tip" slot="tip">
            File harus bertipe file gambar
          </div>
        </el-upload>
        <el-progress
          :percentage="uploadProgress"
          v-if="isUploading"
        ></el-progress>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import "../../style/page/article.scss";
import AppHeader from "../Header.vue";
import defaultImg from "@/assets/article.jpg";

export default {
  name: "Home",
  data: () => ({
    title: "",
    content: "",
    img: null,
    isLoading: false,
    lastModifiedObj: new Date(),
    isDialogOpen: false,
    isLoadingSubmit: false,
    isUploading: false,
    uploadProgress: 0,
  }),
  components: {
    "app-header": AppHeader,
  },
  computed: {
    bigImg() {
      if (this.img === null) {
        return defaultImg;
      } else {
        return this.img;
      }
    },
    lastModified() {
      return new Intl.DateTimeFormat("id", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(this.lastModifiedObj);
    },
  },
  props: {
    isEditMode: Boolean,
  },
  methods: {
    async onSave(redirect) {
      this.isLoadingSubmit = true;
      const data = {
        title: this.title,
        description: this.content,
      };

      try {
        if (this.isEditMode) {
          const id = this.$route.params.id;
          await this.$blog.editPost({
            id,
            ...data,
          });
          await this.refreshData();
          if (redirect) {
            this.$router.push(`/posts/${id}`);
          }
        } else {
          const id = await this.$blog.addPost(data);

          if (id) {
            this.$router.push(`/posts/${id}`);
          } else {
            this.$message.error("Gagal menyimpan data");
          }
        }
      } catch {
        this.$message.error("Gagal menyimpan data");
      }

      this.isLoadingSubmit = false;
    },
    async refreshData() {
      this.isDialogOpen = false;
      this.uploadProgress = 0;

      try {
        const id = this.$route.params.id;
        const posts = await this.$blog.getBlog(id);

        if (posts) {
          this.title = posts.title;
          this.content = posts.description;
          this.img = posts.photo;
          this.lastModifiedObj = posts.updated_at;
        } else {
          this.$notify.warning({
            title: "Peringatan",
            message: "Artikel yang anda cari tidak ditemukan",
          });
          this.$router.push("/posts/add");
        }
      } catch (err) {
        console.dir(err);
        this.$message.error("Terjadi kesalahan saat pengambilan data.");
        this.$router.push("/");
      }
    },
    async uploadFile({ file }) {
      this.isUploading = true;
      const callback = this.changeData.bind(this);

      try {
        const id = this.$route.params.id;
        await this.$blog.uploadPhoto(
          {
            id,
            photo: file,
          },
          callback
        );
        await this.refreshData();
      } catch (err) {
        this.$message.error("Terjadi kesalahan saat pengambilan data.");
        throw new Error("Gagal Upload FIle");
      }
      this.isUploading = false;
      this.$refs.file.clearFiles();
      this.$refs.fileModal.clearFiles();
    },
    changeData(score) {
      this.uploadProgress = parseInt(score.toFixed(0));
    },
  },
  async beforeMount() {
    if (this.isEditMode) {
      document.title = "Edit Postingan - Bloggque";
      await this.refreshData();
    } else {
      document.title = "Tambah Postingan - Bloggque";
    }

    this.$notify.info({
      title: "Tips",
      message: "Anda dapat gunakan CTRL+S untuk menyimpan perubahan",
    });
  },
};
</script>

<style>
</style>