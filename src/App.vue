<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html, #app {
  overflow-y: auto;

  &::-webkit-scrollbar-track-piece {
    background: #d3dce6;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #99a9bf;
    border-radius: 20px;
  }
}
</style>
