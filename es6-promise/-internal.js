import {
    objectOrFunction
} from './utils'
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

function handleMaybeThenable(promise,maybeThenable,then){
    if(maybeThenable.constructor === promise.constructor && then===originalThen && maybeThenable.constructor.resolve === originalResolve){
        handleOwnThenable(promise, maybeThenable);
    }else{

    }
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
function fulfill(promise,value){
    if(promise._state !== PENDING){return;}
    promise._result = value;
    promise._state = FULFILLED;
    if (promise._subscribers.length !== 0) {
        asap(publish, promise);
    }
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