<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  render(h, context) {
    let {icon, title} = context.props
    const vnodes = []

    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon']}/>)
      } else {
        icon = 'fa ' + icon
        vnodes.push(<font-awesome-icon icon={(icon)}></font-awesome-icon>)
      }
    }

    if (title) {
      vnodes.push(<span slot="title">{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}

.svg-inline--fa {
  width: 1.5em;
  height: 1.5em;
  color: currentColor;
  margin: 0 12px 0 12px;
}
</style>
