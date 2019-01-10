import {
    noop,
    nextId,
    PROMISE_ID,
    initializePromise
} from './-internal.js';


function needsResolver() {
    throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}
function needsNew() {
    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

class Promise{
constructor(resolver){
    this[PROMISE_ID] = nextId()
    this._result = this._state = undefined
    this._subscribers = []
    if(noop!==resolver){
        typeof resolver !== 'function' && needsResolver();
        this instanceof Promise ? initializePromise(this, resolver): needsNew();

    }
}
}
let a = new Promise(function(resolve,reject){
    setTimeout(()=>{  resolve(a)},100)

})

