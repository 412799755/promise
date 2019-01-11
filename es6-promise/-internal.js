//产生随机Idjs 直接写import不能用
export const PROMISE_ID = Math.random().toString(36).substring(2)

function noop(){
}
const PENDING   = void 0;
const FULFILLED = 1;
const REJECTED  = 2;

function selfFulfillment(){
    return new TypeError("You cannot resolve a promise with itself");
}



function resolve(promise,value){
    console.log(promise,value)
     if(promise === value){
       reject(promise, selfFulfillment());
     } else if(objectOrFunction(value)){
        handleMaybeThenable(promise,value,getThen(value))
     } else{
        fulfill(promise, value)
     }
}

function pulishRejection(promise){
    if(promise._onerror){
        promise._onerror(promise._result);
    }
    publish(promise);
}
function reject(promise,reason){
    if(promise._state !== PENDING){return;}
    promise._state = REJECTED;
    promise._result = reason;
    asap(publishRejection, promise);
}
function initializePromise(promise,resolver) {

    try{
        console.log(resolver)
        resolver(function resolvePromise(value) {
     resolve(promise,value)
    },function rejectPromise(reason) {
            reject(promise,value)
        })
    } catch(e){
        console.log(e)
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