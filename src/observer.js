import Dep, {
  pushTarget
} from './dep'

import {
  arrayMethods
} from "./array"
import {
  def
} from "./lang"

const hasProto = '__proto__' in {}
const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

export default class Observer {
  constructor(value) {
    this.value = value
    this.dep = new Dep()
    def(value, '__ob__', this)

    if (Array.isArray(value)) {
      //value.__proto__ = arrayMethods
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value)

    } else {
      this.walk(value)
    }
  }


  walk(obj) {
    const keys = Object.keys(obj)

    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray(items) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}


function defineReactive(data, key, val) {
  if (typeof val === 'object') {
    new Observer(val)
  }
  let childOb = observe(val)
  const dep = new Dep()

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      //console.log('get')
      if (Dep.target) {
        dep.depend() //快照 data 对象的所有属性
      }

      if (childOb) {
        childOb.dep.depend()
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


/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment(target, src, keys) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}

export function observe(value, asRootDate) {
  if (!isObject(value)) {
    return
  }
  let ob
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else {
    ob = new Observer(value)
  }

  return ob

}

export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}