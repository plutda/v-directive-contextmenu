# v-contextmenu

Vue2.x自定义右键菜单 <br/>

```
// preview
git clone git@github.com:Plutda/v-contextmenu.git
cd v-contextmenu
npm install
npm run serve
```

## example
```
// bash
npm i @pluto1219/v-contextmenu

// main.js
import Vue from 'vue'
import contextmenu from '@pluto1219/v-contextmenu'
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