'use strict';function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}function styleInject(css, ref) {
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
}var css_248z = ".contextmenu {\n  left: 100px;\n  top: 100px;\n  margin: 0;\n  background: #fff;\n  z-index: 3000;\n  position: absolute;\n  list-style-type: none;\n  padding: 5px 0;\n  border-radius: 4px;\n  font-size: 12px;\n  font-weight: 400;\n  color: #333;\n  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);\n}\n.contextmenu ul {\n  padding: 0;\n  margin: 0;\n}\n\n.contextmenu li {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  margin: 0;\n  padding: 7px 16px;\n  cursor: pointer;\n}\n.contextmenu li:hover {\n  background: #eee;\n}\n";
styleInject(css_248z);function handleContext(e) {
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
};// Import vue components

var install = function installVContextmenu(Vue) {
  Vue.directive('contextmenu', contextmenu);
}; // Create module definition for Vue.use()
var components=/*#__PURE__*/Object.freeze({__proto__:null,'default': install});// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)

Object.entries(components).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      componentName = _ref2[0],
      component = _ref2[1];

  if (componentName !== 'default') {
    install[componentName] = component;
  }
});module.exports=install;