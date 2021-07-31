function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".contextmenu {\n  left: 100px;\n  top: 100px;\n  margin: 0;\n  background: #fff;\n  z-index: 3000;\n  position: absolute;\n  list-style-type: none;\n  padding: 5px 0;\n  border-radius: 4px;\n  font-size: 12px;\n  font-weight: 400;\n  color: #333;\n  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);\n}\n.contextmenu ul {\n  padding: 0;\n  margin: 0;\n}\n\n.contextmenu li {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  margin: 0;\n  padding: 7px 16px;\n  cursor: pointer;\n}\n.contextmenu li:hover {\n  background: #eee;\n}\n";
styleInject(css_248z);

function handleContext(e) {
  var contextMenu = this.contextMenu,
      binding = this.binding,
      vm = this.vm;

  if (contextMenu.children.length) {
    contextMenu.removeChild(contextMenu.childNodes[0]);
  }

  var ul = document.createElement('ul');
  var target = e.target;
  binding.value.map(function (option, index) {
    var li = document.createElement('li');
    li.innerText = option.text;
    li.className = 'contextmenu-child'; // vm.context是使用了v-contextmenu指令的上下文环境

    li.onclick = option && option.handler && option.handler.bind(vm && vm.context, li, index, target);
    ul.appendChild(li);
  });
  contextMenu.appendChild(ul);
  e.preventDefault(); // const menuWidth = 100
  // contextMenu.style.width = `${menuWidth}px`
  // 动态获取menu高度和宽度

  var menuHeight = +window.getComputedStyle(contextMenu)['height'].replace(/px/, '');
  var menuWidth = +window.getComputedStyle(contextMenu)['width'].replace(/px/, ''); // horizontal

  if (e.clientX + menuWidth >= window.innerWidth) {
    contextMenu.style.left = "".concat(e.clientX - menuWidth, "px");
  } else {
    contextMenu.style.left = "".concat(e.clientX, "px");
  }

  if (e.clientY + menuHeight >= window.innerHeight) {
    contextMenu.style.top = "".concat(e.clientY - menuHeight, "px");
  } else {
    contextMenu.style.top = "".concat(e.clientY, "px");
  }

  document.body.appendChild(contextMenu);
  contextMenu.style.visibility = 'visible';
  window.addEventListener('click', cb); // 判断点击是否在元素外部

  function cb(e) {
    var is_inner = contextMenu.contains(e.target);
    var is_menu_child = e.target.className === 'contextmenu-child';
    var has_child = contextMenu.childNodes[0];

    if ((!is_inner || is_menu_child) && has_child) {
      contextMenu.removeChild(contextMenu.childNodes[0]);
      document.body.removeChild(contextMenu);
      contextMenu.style.visibility = 'hidden';
      window.removeEventListener('click', cb);
    }
  }
}

var opt = {};
var contextmenu = {
  inserted: function inserted(el, binding, vm) {
    var contextMenu = document.createElement('div'); // document.body.appendChild(contextMenu)

    contextMenu.className = 'contextmenu';
    opt = {
      contextMenu: contextMenu,
      el: el,
      binding: binding,
      vm: vm
    };
    el.addEventListener('contextmenu', handleContext.bind(opt));
  },
  unbind: function unbind(el, binding) {
    el.removeEventListener('contextmenu', handleContext.bind(opt));
  }
};

// Import vue components

var install = function installVContextmenu(Vue) {
  Vue.directive('contextmenu', contextmenu);
}; // Create module definition for Vue.use()

export { install as default };
