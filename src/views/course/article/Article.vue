<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
      </el-col>

      <el-col :span="1.5">
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete">删除</el-button>
      </el-col>

      <el-col :span="1.5">
        <el-button type="info" icon="el-icon-plus" size="mini" @click="$router.push('type')">分类管理</el-button>
      </el-col>

    </el-row>

  </div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {}
  },
  methods: {


    /**
     * 添加按钮的操作
     */
    handleAdd() {
    },

    /**
     * 删除按钮的操作
     */
    handleDelete() {

    },
  },
}
</script>

<style scoped>

</style>
