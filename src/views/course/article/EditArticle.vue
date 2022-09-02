<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="formData" label-width="80px" v-loading="loading">
      <el-row :span="8">
        <el-col :span="8">
          <el-form-item label="标题" prop="title">
            <el-input v-model="formData.title" placeholder="请输入文章标题"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="分类" prop="type">
            <el-select v-model="formData.type" placeholder="请选择文章分类">
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="价格" prop="price">
            <el-input-number
              v-model="formData.price"
              :precision="2"
              :step="0.01"
              placeholder="请输入价格(单位: 元)"
              controls-position="right"
              :min="0.0">
            </el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="封面" prop="cover">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="formData.cover" :src="formData.cover" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="text-info">
          <i class="el-icon-info"></i>
          <span> 建议尺寸400x300 宽高比4:3</span>
        </div>
      </el-form-item>

      <el-form-item label="文章内容" prop="content">
        <markdown-editor v-if="init" :content="formData.content" @change="handleContentChange"></markdown-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import {getArticleTypeSampleList} from '@/api/course/articleType'
import {createArticle, getArticleInfo, updateArticle} from '@/api/course/article'


export default {

  name: "EditArticle",
  components: {MarkdownEditor},

  data() {
    return {
      // 加载动画
      loading: false,
      // 是否初始化完成
      init: false,
      // 表单信息
      formData: {
        content: '',
        title: '',
        type: '',
        cover: '',
        price: 0.0,
      },
      // 分类信息
      typeList: [],
      // 文件上传地址
      uploadUrl: process.env.VUE_APP_API_PREFIX + '/file/upload',
      // 图片预览地址
      imageUrl: '',

      isCreate: this.$route.path.endsWith('create'),
      rules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'},
          {min: 1, max: 64, message: '长度不能大于64个字符', trigger: 'blur'},
        ],
        type: [
          {required: true, message: '请选择分类', trigger: 'blur'},
        ],
        price: [
          {required: true, message: '请输入价格', trigger: 'blur'},
        ],
        cover: [
          {required: true, message: '请上传封面照片', trigger: 'blur'},
        ],
        content: [
          {required: true, message: '请输入文章内容', trigger: 'blur'},
          {min: 1, max: 4096, message: '长度不能大于4096个字符', trigger: 'blur'},
        ],
      },
    }
  },
  created() {
    this.getTypeList()
    if (!this.isCreate) {
      this.loading = true
      getArticleInfo(this.$route.query.id).then(res => {
        this.formData = res.data
        this.loading = false
        this.init = true
      })
    } else {
      this.init = true
    }
  },
  methods: {
    /**
     * 获取文章类型列表
     */
    getTypeList() {
      getArticleTypeSampleList().then(res => {
        this.typeList = res.data
      })
    },
    /**
     * 退回上一页的操作
     */
    back() {
      const router = this.$route
      this.$router.go(-1)
      this.$store.dispatch('tagsView/delCachedView', router)
      this.$store.dispatch('tagsView/delVisitedView', router)
    },
    /**
     * 上传文件之前的钩子函数
     */
    beforeAvatarUpload(file) {
      const typePattern = /^image\/[a-z]*$/
      const isImg = file.type.match(typePattern);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImg) {
        this.$modal.msgError('封面只能是图片格式!');
      }
      if (!isLt2M) {
        this.$modal.msgError('封面大小不能超过 2MB!');
      }
      return isImg && isLt2M;
    },
    /**
     * 上传文件成功的回调方法
     */
    handleAvatarSuccess(res, file) {
      this.formData.cover = res.data;
    },
    /**
     * markdown 内容改变时的钩子函数
     */
    handleContentChange(newVal) {
      this.formData.content = newVal
    },
    /**
     * 提交表单的操作
     */
    onSubmit() {
      this.$refs["form"].validate(res => {
        if (res) {
          this.loading = true
          if (this.isCreate) {
            createArticle(this.formData).then(() => {
              this.$modal.msgSuccess('新增文章成功!')
              this.loading = false
              this.back()
            })
          } else {
            updateArticle(this.formData).then(() => {
              this.$modal.msgSuccess('修改文章成功!')
              this.loading = false
              this.back()
            })
          }
        }
      })
    },
    /**
     * 取消按钮
     */
    onCancel() {
      this.back()
    },
  }
  ,
}
</script>

<style scoped>
.el-input-number, .el-select {
  width: 100%;
}

::v-deep.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

::v-deep.avatar-uploader .el-upload:hover {
  border-color: #409EFF !important;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 240px;
  height: 180px;
  line-height: 180px;
  text-align: center;
}

.avatar {
  width: 240px;
  height: 180px;
  display: block;
}
</style>
