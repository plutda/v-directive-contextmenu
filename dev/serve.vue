<script>
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      contextmenu1: [
        { text: '菜单1' },
        { text: '菜单2' },
        { text: '菜单3' }
      ],
      contextmenu2: [
        { text: '菜单1', handler: this.handleClick },
        { text: '菜单2', handler: this.handleClick },
        { text: '菜单3', handler: this.handleClick }
      ]
    }
  },
  methods: {
    /**
     * @description: click handler
     * @param {*} menuClick 点击的菜单项
     * @param {*} menuIndex 点击的菜单项下标
     * @param {*} target 点击弹出菜单的dom
     * @param {*} evt 点击事件
     */
    handleClick(menuClick, menuIndex, target, evt) {
      alert(`点击了菜单第${menuIndex}项`)
    }
  },
  name: 'ServeDev'
});
</script>

<template>
  <div id="app">
    <p class="title">没有事件处理函数:</p>
    <ul class="demo" v-contextmenu="contextmenu1">
      <li>apple</li>
      <li>banana</li>
      <li>peach</li>
    </ul>
    <p class="title">有事件处理函数:</p>
    <ul class="demo" v-contextmenu="contextmenu2">
      <li>apple</li>
      <li>banana</li>
      <li>peach</li>
    </ul>
  </div>
</template>

<style scope>
#app .demo {
  margin: 20px;
}
#app .title {
  font-size: 14px;
}
#app .demo:hover {
  cursor: pointer;
}
ul,li {
  margin: 0;
  padding: 0;
}
</style>