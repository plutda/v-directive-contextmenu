import './context-menu.css'

function handleContext(e) {
  const { contextMenu, binding, vm } = this
  if (contextMenu.children.length) {
    contextMenu.removeChild(contextMenu.childNodes[0])
  }
  const ul = document.createElement('ul')
  const target = e.target

  binding.value.map((option, index) => {
    const li = document.createElement('li')
    li.innerText = option.text
    li.className = 'contextmenu-child'
    // vm.context是使用了v-contextmenu指令的上下文环境
    li.onclick = option && option.handler && option.handler.bind(vm && vm.context, li, index, target)
    ul.appendChild(li)
  })

  contextMenu.appendChild(ul)
  e.preventDefault()

  // const menuWidth = 100
  // contextMenu.style.width = `${menuWidth}px`
  // 动态获取menu高度和宽度
  const menuHeight = +window.getComputedStyle(contextMenu)['height'].replace(/px/, '')
  const menuWidth = +window.getComputedStyle(contextMenu)['width'].replace(/px/, '')

  // horizontal
  if (e.clientX + menuWidth >= window.innerWidth) {
    contextMenu.style.left = `${e.clientX - menuWidth}px`
  } else {
    contextMenu.style.left = `${e.clientX}px`
  }

  if (e.clientY + menuHeight >= window.innerHeight) {
    contextMenu.style.top = `${e.clientY - menuHeight}px`
  } else {
    contextMenu.style.top = `${e.clientY}px`
  }

  document.body.appendChild(contextMenu)
  contextMenu.style.visibility = 'visible'
  window.addEventListener('click', cb)

  // 判断点击是否在元素外部
  function cb(e) {
    const is_inner = contextMenu.contains(e.target)
    const is_menu_child = e.target.className === 'contextmenu-child'
    const has_child = contextMenu.childNodes[0]
    if ((!is_inner || is_menu_child) && has_child) {
      contextMenu.removeChild(contextMenu.childNodes[0])
      document.body.removeChild(contextMenu)
      contextMenu.style.visibility = 'hidden'
      window.removeEventListener('click', cb)
    }
  }
}

let opt = {}

export default {
  inserted(el, binding, vm) {
    const contextMenu = document.createElement('div')
    // document.body.appendChild(contextMenu)
    contextMenu.className = 'contextmenu'

    opt = { contextMenu, el, binding, vm }
    el.addEventListener('contextmenu', handleContext.bind(opt))
  },
  unbind(el, binding) {
    el.removeEventListener('contextmenu', handleContext.bind(opt))
  }
}
