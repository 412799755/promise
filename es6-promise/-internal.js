import {
    objectOrFunction,
    isFunction
} from './utils.js'
import {
    asap
} from "./asap.js";


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

function getThen(promise) {
    try {
        return promise.then;
    } catch(error) {
        TRY_CATCH_ERROR.error = error;
        return TRY_CATCH_ERROR;
    }
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

function publishRejection(promise) {
    if (promise._onerror) {
        promise._onerror(promise._result);
    }

    publish(promise);
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
function subscribe(parent, child, onFulfillment, onRejection) {
    let { _subscribers } = parent;
    let { length } = _subscribers;

    parent._onerror = null;

    _subscribers[length] = child;
    _subscribers[length + FULFILLED] = onFulfillment;
    _subscribers[length + REJECTED]  = onRejection;

    if (length === 0 && parent._state) {
        asap(publish, parent);
    }
}

function publish(promise) {
    let subscribers = promise._subscribers;
    let settled = promise._state;

    if (subscribers.length === 0) { return; }

    let child, callback, detail = promise._result;

    for (let i = 0; i < subscribers.length; i += 3) {
        child = subscribers[i];
        callback = subscribers[i + settled];

        if (child) {
            invokeCallback(settled, child, callback, detail);
        } else {
            callback(detail);
        }
    }

    promise._subscribers.length = 0;
}


function tryCatch(callback, detail) {
    try {
        return callback(detail);
    } catch(e) {
        TRY_CATCH_ERROR.error = e;
        return TRY_CATCH_ERROR;
    }
}

function invokeCallback(settled, promise, callback, detail) {
    let hasCallback = isFunction(callback),
        value, error, succeeded, failed;

    if (hasCallback) {
        value = tryCatch(callback, detail);

        if (value === TRY_CATCH_ERROR) {
            failed = true;
            error = value.error;
            value.error = null;
        } else {
            succeeded = true;
        }

        if (promise === value) {
            reject(promise, cannotReturnOwn());
            return;
        }

    } else {
        value = detail;
        succeeded = true;
    }

    if (promise._state !== PENDING) {
        // noop
    } else if (hasCallback && succeeded) {
        resolve(promise, value);
    } else if (failed) {
        reject(promise, error);
    } else if (settled === FULFILLED) {
        fulfill(promise, value);
    } else if (settled === REJECTED) {
        reject(promise, value);
    }
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
function makePromise(promise) {
    promise[PROMISE_ID] = id++;
    promise._state = undefined;
    promise._result = undefined;
    promise._subscribers = [];
}
export {
    nextId,
    makePromise,
    getThen,
    noop,
    resolve,
    reject,
    fulfill,
    subscribe,
    publish,
    publishRejection,
    initializePromise,
    invokeCallback,
    FULFILLED,
    REJECTED,
    PENDING,
    handleMaybeThenable
}