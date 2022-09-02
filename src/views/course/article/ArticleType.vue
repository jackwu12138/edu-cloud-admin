<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
      </el-col>
      <right-toolbar :searchable="false" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table ref="table" v-loading="loading" :data="formData" border>

      <el-table-column label="id" align="center" prop="id" sortable/>

      <el-table-column label="类型名" align="center" prop="name" width="240">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.name" class="edit-input" size="small"/>
          </template>
          <span v-else>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="显示顺序" align="center" prop="sort" sortable>
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input-number v-model="row.sort" :min="0" :max="99" label="显示顺序"></el-input-number>
          </template>
          <span v-else>{{ row.sort }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-switch
              v-model="row.status"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
          <span v-else>
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
          <div v-if="row.edit">
            <el-button type="primary" @click="confirmEdit(row)">确认</el-button>
            <el-button @click="cancelEdit(row)">取消</el-button>
          </div>
          <div v-else>
            <el-button type="primary" @click="handleUpdate(row)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="dialogOpen" width="400px" append-to-body>
      <el-form ref="createForm" :model="createForm" :rules="rules" label-width="80px">
        <el-form-item label="类型名" prop="name">
          <el-input v-model="createForm.name" placeholder="请输入文章类型名"/>
        </el-form-item>
        <el-form-item label="显示顺序" prop="sort">
          <el-input-number v-model="createForm.sort" :min="0" :max="99" value="0"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancelCreate">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  createArticleTypeList,
  deleteArticleTypeList,
  getArticleTypeList,
  updateArticleTypeList,
} from '@/api/course/articleType'

export default {
  name: "ArticleType",
  data() {
    return {
      // 表单加载状态
      loading: false,
      // 表单数据
      formData: [],
      // 行内数据参数(用于数据修改)
      original: {
        id: null,
        title: '',
        sort: 0,
        name: '',
      },

      // 弹出层标题
      title: "新增文章类型",
      // 是否显示弹出层
      dialogOpen: false,
      // 新增表单参数
      createForm: {},
      // 表单校验
      rules: {
        name: [
          {required: true, message: "文章类型名不能为空", trigger: "blur"},
        ],
      },
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
      this.loading = true;
      getArticleTypeList().then(response => {
          let data = response.data
          data.map(v => {
            this.$set(v, 'edit', false)
            return v
          })
          this.formData = data
          this.loading = false;
        },
      )
    },

    /**
     * 添加按钮的操作
     */
    handleAdd() {
      this.dialogOpen = true
      this.initCreateForm()
    },

    /**
     * 删除按钮的操作
     */
    handleDelete(row) {
      this.$modal.confirm(`是否删除 id 为 [ ${row.id} ] 的数据项?`).then(() => {
        deleteArticleTypeList(row.id).then(() => {
          this.getList()
        })
      })
    },
    /**
     * 修改按钮的操作
     */
    handleUpdate(row) {
      row.edit = !row.edit
      this.original.name = row.name
      this.original.sort = row.sort
      this.original.status = row.status
    },
    /**
     * 确认编辑按钮的操作
     */
    confirmEdit(row) {
      row.edit = false
      this.original.name = row.name
      this.original.sort = row.sort
      this.original.status = row.status
      this.original.id = row.id
      this.loading = true
      updateArticleTypeList(this.original).then(() => {
        this.$modal.msgSuccess('更新成功!')
        this.getList()
      })
    },
    /**
     * 取消编辑按钮的操作
     */
    cancelEdit(row) {
      row.edit = false
    },
    /**
     * 提交表单
     */
    submitForm() {
      this.$refs["createForm"].validate(valid => {
        if (valid) {
          createArticleTypeList(this.createForm).then(() => {
            this.$modal.msgSuccess('更新成功!')
            this.dialogOpen = false;
            this.getList();
          });
        }
      });
    },
    /**
     * 取消新增表单操作
     */
    cancelCreate() {
      this.dialogOpen = false
    },

    initCreateForm() {
      this.createForm = {
        sort: 0,
        name: '',
      }
    },

  },
}
</script>

<style scoped>
</style>
