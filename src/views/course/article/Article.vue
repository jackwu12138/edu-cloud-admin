<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="info" icon="el-icon-edit" size="mini" @click="$router.push('type')">分类管理</el-button>
      </el-col>
      <right-toolbar :searchable="false" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table ref="table" v-loading="loading" :data="formData" border>
      <el-table-column label="编号" align="center" prop="id" :width="90" sortable/>

      <el-table-column label="封面" align="center" prop="cover" :width="180">
        <template slot-scope="{row}">
          <el-image style="width: 120px; height: 90px"
                    :src="row.cover" fit="fill"
                    :preview-src-list="[row.cover]" lazy>
          </el-image>
        </template>
      </el-table-column>

      <el-table-column label="标题" align="center" prop="title" :width="240">
      </el-table-column>

      <el-table-column label="分类" align="center" prop="typeName">
        <template slot-scope="{row}">
          <el-tag type="success" disable-transitions>{{ row.typeName }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="价格" align="center" prop="price" sortable :width="80">
        <template slot-scope="{row}">
          <span v-if="row.price === '0.00'">免费</span>
          <span v-else>{{ row.price }}</span>
        </template>
      </el-table-column>

      <el-table-column label="销量" align="center" prop="sales" sortable :width="80"/>

      <el-table-column label="点赞" align="center" prop="likes" sortable :width="80"/>

      <el-table-column label="阅读量" align="center" prop="readTime" sortable :width="100"/>

      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="{row}">
          <span>
            <el-tag v-if="row.status" type="success" disable-transitions>开启</el-tag>
            <el-tag v-else type="error" disable-transitions>关闭</el-tag>
          </span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" align="center" prop="status">
        <template slot-scope="{row}">
          {{ $parseTime(row.createTime) }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="{row}">
          <div>
            <el-button type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {deleteArticle, getArticleList} from '@/api/course/article'

export default {
  name: "Article",
  data() {
    return {
      // 表单加载状态
      loading: false,
      // 表单数据
      formData: [],
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /**
     * 从后台查询数据的方法
     */
    getList() {
      this.loading = true
      getArticleList().then(res => {
        this.formData = res.data
        this.loading = false
      })
    },
    /**
     * 添加按钮的操作
     */
    handleAdd() {
      this.$router.push('/course/article/create')
    },
    /**
     * 删除按钮的操作
     */
    handleDelete(row) {
      this.$modal.confirm("是否确认删除id为 [ " + row.id + " ] 的数据项").then(() => {
        deleteArticle(row.id).then(() => {
          this.getList()
          this.$modal.msgSuccess('删除成功')
        })
      })
    },
    /**
     * 更新按钮的操作
     */
    handleEdit(row) {
      this.$router.push({path: '/course/article/edit', query: {id: row.id}})
    },
  },
}
</script>

<style scoped>
.el-image {
  border-radius: 12px;
}
</style>
