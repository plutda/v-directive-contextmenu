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
}function handleContext(e) {
  var contextMenu = this.contextMenu,
      binding = this.binding,
      vm = this.vm;
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

    if (!is_inner || is_menu_child) {
      contextMenu.style.visibility = 'hidden';
      contextMenu.removeChild(ul);
      document.body.removeChild(contextMenu);
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