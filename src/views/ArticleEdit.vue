<template>
  <article-editor :isEditMode="true" :id="$route.params.id"></article-editor>
</template>

<script>
import ArticleEditor from "../components/ArticleEditor/ArticleEditor.vue";

export default {
  components: {
    "article-editor": ArticleEditor,
  },
};
</script>
