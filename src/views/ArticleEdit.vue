<template>
  <page-container>
    <article-editor :isEditMode="true" :id="$route.params.id"></article-editor>
  </page-container>
</template>

<script>
import ArticleEditor from "../components/ArticleEditor/ArticleEditor.vue";
import PageContainer from "../components/PageContainer.vue";

export default {
  components: {
    "article-editor": ArticleEditor,
    "page-container": PageContainer,
  },
};
</script>
