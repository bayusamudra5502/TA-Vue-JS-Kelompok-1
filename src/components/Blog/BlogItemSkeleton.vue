<template>
  <el-skeleton :loading="loading" animated>
    <template slot="template">
      <el-card class="box-card" shadow="hover" style="margin-bottom: 10px">
        <div class="content">
          <el-skeleton-item
            variant="h1"
            style="width: 50%; margin-bottom: 20px"
          />
          <el-skeleton-item variant="text" />
          <el-skeleton-item variant="text" />
          <el-skeleton-item variant="text" />
          <el-skeleton-item variant="text" />
          <el-skeleton-item variant="text" />

          <el-skeleton-item variant="text" />
        </div>
        <div class="image">
          <el-skeleton-item variant="image" style="width: 100%; height: 100%" />
        </div>
      </el-card>
    </template>
    <template>
      <slot />
    </template>
  </el-skeleton>
</template>

<script>
export default {
  props: {
    loading: Boolean,
  },
};
</script>
