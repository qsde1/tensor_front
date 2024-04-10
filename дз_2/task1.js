function task1(arr) {
    let array = [...arr] //копия массива, чтобы .sort() не изменил оригинальный массив
    array.sort((a, b)=>a-b);
    return array;
}