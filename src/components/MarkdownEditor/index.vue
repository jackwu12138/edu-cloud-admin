<template>
  <div>
    <v-md-editor v-model="editorValue"
                 :disabled-menus="[]"
                 :left-toolbar="leftToolbar"
                 @upload-image="handleUploadImage"
                 height="400px">
    </v-md-editor>
  </div>
</template>

<script>

import {uploadFile} from '@/api/course/file'

export default {
  data() {
    return {
      // 左侧菜单
      leftToolbar: 'undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code ',
      editorValue: this.content != null ? this.content : "",
      // 文件大小
      fileSize: 2,
    }
  },
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  created() {
  },
  methods: {
    // v-md-editor 文件上传
    handleUploadImage(event, insertImage, files) {
      for (let i = 0; i < files.length; i++) {
        if (this.handleBeforeUpload(files[i])) {
          uploadFile(files[i]).then(res => {
            this.$modal.msgSuccess('文件上传成功!')
            insertImage({
              url: res.data,
            });
          })
        }
      }
    },
    handleBeforeUpload(file) {
      // 校检文件大小
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize;
        if (!isLt) {
          this.$modal.msgError(`上传文件大小不能超过 ${this.fileSize} MB!`);
          return false;
        }
      }
      return true;
    },
  },
  watch: {
    editorValue(newNum) {
      this.$emit('change', newNum)
    },
  },
}
</script>
<style>
.example-wrap /deep/ #editor {
  min-height: calc(100% - 51px) !important;
}

.example-wrap /deep/ textarea {
  min-height: calc(100% - 51px) !important;
}
</style>

