export function objectOrFunction(x){
    let type = typeof x;
    return x !==null && (type === 'object' || type === 'function')
}