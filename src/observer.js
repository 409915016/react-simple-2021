import Dep, {
  pushTarget
} from './dep'

export default class Observer {
  constructor(value) {
    this.value = value
    if (!Array.isArray(value)) {
      this.walk(value)
    }
  }


  walk(obj) {
    const keys = Object.keys(obj)

    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }
}


function defineReactive(data, key, val) {
  if (typeof val === 'object') {
    new Observer(val)
  }

  const dep = new Dep()

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      console.log('get')
      if (Dep.target) {
        dep.depend() //快照 data 对象
      }

      return val
    },
    set: function (newVal) {
      //console.log('set')
      if (val === newVal) {
        return
      }
      val = newVal
      dep.notify()
    }
  })
}