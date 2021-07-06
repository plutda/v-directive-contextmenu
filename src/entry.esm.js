
// Import vue components
import contextmenu from './lib/context-menu.js'

// install function executed by Vue.use()
const install = function installVContextmenu(Vue) {
  Vue.directive('contextmenu', contextmenu)
};

// Create module definition for Vue.use()
export default install;
