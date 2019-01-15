import {
    invokeCallback,
    subscribe,
    FULFILLED,
    REJECTED,
    noop,
    makePromise,
    PROMISE_ID
} from './-internal.js'
console.log(PROMISE_ID,'w')
import { asap } from './asap.js';

export default function then(onFulfillment, onRejection) {
    const parent = this

    const child = new this.constructor(noop);

    if(child[PROMISE_ID] === undefined){

    }
}