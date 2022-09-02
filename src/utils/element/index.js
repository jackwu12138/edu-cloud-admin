import {Loading, Message, MessageBox, Notification} from 'element-ui'

let loadingInstance;

/**
 * 消息提示
 */
export function msg(content) {
  Message.info(content)
}

/**
 * 错误提示
 */
export function msgError(content) {
  Message.error(content)
}

/**
 * 成功提示
 */
export function msgSuccess(content) {
  Message.success(content)
}

/**
 * 警告提示
 */
export function msgWarning(content) {
  Message.warning(content)
}

/**
 * 弹出提示
 */
export function alert(content) {
  return MessageBox.alert(content, "系统提示")
}

/**
 * 弹出错误提示
 */
export function alertError(content) {
  return MessageBox.alert(content, "系统提示", {type: 'error'})
}

/**
 * 弹出成功提示
 */
export function alertSuccess(content) {
  return MessageBox.alert(content, "系统提示", {type: 'success'})
}

/**
 * 弹出警告提示
 */
export function alertWarning(content) {
  return MessageBox.alert(content, "系统提示", {type: 'warning'})
}

/**
 * 通知提示
 */
export function notify(content) {
  Notification.info(content)
}


/**
 * 通知错误提示
 */
export function notifyError(content) {
  Notification.error(content);
}

/**
 * 通知成功提示
 */
export function notifySuccess(content) {
  Notification.success(content)
}

/**
 * 通知警告提示
 */
export function notifyWarning(content) {
  Notification.warning(content)
}

/**
 * 确认窗体
 */
export function confirm(content) {
  return MessageBox.confirm(content, "系统提示", {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: "warning",
  })
}

/**
 * 提交内容
 */
export function prompt(content) {
  return MessageBox.prompt(content, "系统提示", {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: "warning",
  })
}

/**
 * 打开遮罩层
 */
export function loading(content) {
  loadingInstance = Loading.service({
    lock: true,
    text: content,
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)",
  })
}

/**
 * 关闭遮罩框
 */
export function closeLoading() {
  loadingInstance.close();
}
