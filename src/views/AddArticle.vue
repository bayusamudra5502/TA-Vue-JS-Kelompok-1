<template>
  <article-editor :isEditMode="false"></article-editor>
</template>

<script>
import ArticleEditor from "../components/ArticleEditor/ArticleEditor.vue";

export default {
  components: {
    "article-editor": ArticleEditor,
  },
};
</script>
