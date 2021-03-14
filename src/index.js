import observer from "./observer"
import watcher from "./watcher"


// function init({
//   data
// }) {
//   return new observer(data)
// }

// function $watch(vm, expOrFn, cb) {
//   return new watcher(vm, expOrFn, function (val, oldValue) {
//     cb(val, oldValue)
//     console.log('watcher')
//   })
// }


var data = {
  name: "vue",
  other: {
    age: 1
  },
  list : [1, 2,3]
}

new observer(data)

// new init({
//   data
// })

// new watcher(data, 'other.age', function(val, oldValue){
//   console.log('other.age oldValue:' + oldValue)
//   console.log('other.age val:' +val)
// })

// new watcher(data, 'name', function(val, oldValue){
//   console.log('name oldValue:' + oldValue)
//   console.log('name val:' +val)
// })

new watcher(data, 'list', function(val, oldValue){
    console.log('list oldValue:' + oldValue)
    console.log('list val:' +val)
  })
  

data.name = 'Mather'
data.other.age = 2

data.list.push(2)

// console.log(vm)

// vm.b = 1

// console.log(vm)

// setTimeout(()=>{
//   data.b = 111
// },3000)
