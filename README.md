# v-directive-contextmenu
![](https://img.shields.io/static/v1?label=Vue2.x&message=80%&color=green)<br/>
只依赖vuejs、简易的、自定义鼠标右键菜单的指令插件。 <br/>


### [live demo](https://codepen.io/pluto520/pen/BaRVxMe)

## example
```
// bash
npm i v-directive-contextmenu

// main.js
import Vue from 'vue'
import contextmenu from 'v-directive-contextmenu'
Vue.use(contextmenu)
```

```
// demo.vue
<script>
export default ({
  data() {
    return {
      contextmenu2: [
        { text: '菜单1', handler: this.handleClick },
        { text: '菜单2', handler: this.handleClick },
        { text: '菜单3', handler: this.handleClick }
      ]
    }
  },
  methods: {
    handleClick(menuClick, menuIndex, target, evt) {
      alert(`点击了菜单第${menuIndex}项`)
    }
  }
});
</script>

<template>
  <ul class="demo" v-contextmenu="contextmenu2">
    <li>apple</li>
    <li>banana</li>
    <li>peach</li>
  </ul>
</template>

```

```
// 可以下载源代码进行自定义，关键代码在src/lib目录，运行起来非常简单:
git clone git@github.com:Plutda/v-contextmenu.git
cd v-contextmenu
npm install
npm run serve
```