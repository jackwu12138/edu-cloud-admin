<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="类型名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入类型名称"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="字典状态"
          clearable
          style="width: 240px"
        >
          <el-option
            v-for="item in selectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="dateRange"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
      </el-col>

      <el-col :span="1.5">
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete">删除</el-button>
      </el-col>

    </el-row>

    <el-table ref="table" v-loading="loading" :data="formData" border>
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="id" align="center" prop="id"/>
      <el-table-column label="类型名" align="center" prop="name" :show-overflow-tooltip="true" sortable="custom"
                       :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="显示顺序" align="center" prop="sort"/>
      <el-table-column label="状态" align="center" prop="status"/>
      <el-table-column label="创建时间" align="center" prop="status"/>
    </el-table>
  </div>
</template>

<script>
import {getArticleTypeList} from '@/api/course/articleType'

export default {
  name: "ArticleType",
  data() {
    return {
      // 是否显示搜索框
      showSearch: true,
      // 查询参数
      queryParams: {},
      // 搜索下拉选项框的数据
      selectOptions: [
        {label: '开启', value: true},
        {label: '关闭', value: false},
      ],
      // 时间范围
      dateRange: [],
      // 表单加载状态
      loading: false,
      // 表单数据
      formData: [
        {id: 1, name: "test", status: true, time: ''},
        {id: 1, name: "test", status: true},
        {id: 1, name: "test", status: true},
        {id: 1, name: "test", status: true},
      ],

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
          console.log(response)
          this.loading = false;
        },
      );
    },
    /**
     * 查询数据的方法
     */
    handleQuery() {

    },

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

    /**
     * 重置搜索条件
     */
    resetQuery() {

    },
  },
}
</script>

<style scoped>

</style>
