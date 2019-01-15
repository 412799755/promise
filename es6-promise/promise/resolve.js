import {
    noop,
    resolve as _resolve
} from '../-internal'

/**
 * @method resolve
 * @param object
 *
 */
export default function resolve(object) {
let Constructor = this;
    if (object && typeof object === 'object' && object.constructor === Constructor) {
        return object;
    }
    let promise = new Constructor(noop);
    _resolve(promise,object)
    return promise
}