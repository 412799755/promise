//产生随机Idjs 直接写import不能用
export const PROMISE_ID = Math.random().toString(36).substring(2)

function noop(){

}
function resolve(){}
function reject(){}
function initializePromise(promise,resolver) {
    try{
        resolver(function resolvePromise(value) {
     resolve(promise,value)
    },function rejectPromise(reason) {
            reject(promise,value)
        })
    } catch(e){
        reject(promise, e);
    }
}
let id = 0
function nextId() {
return id++
}
export {
    nextId,
    initializePromise,
    noop
}