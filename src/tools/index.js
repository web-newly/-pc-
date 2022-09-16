// 判断不是空对象的属性是否为undefined
export const isUndefined = function (obj={}){
    let result = true;
    let index = 0;
    for(let attr in obj){
      index++
      if(obj[attr] === undefined){
        result = false
      }
    }
    if(index === 0){
      result = false
    }
    return result
}