function task1([...array]) {
    //...array - копия массива, чтобы .sort() не изменил оригинальный массив
    array.sort((a, b) =>a-b);
    return array;
}