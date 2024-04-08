
function task21(arr) {
    if(arr.length< 1)
        return 'массив не должен быть пустым';

    let months = []

    for (let monthIndex = 1; monthIndex <= 12; monthIndex++) {
        let daysMonth = arr.filter(m => m.month == monthIndex) //получить массив дней одного месяца
        if(daysMonth.length){
            let month = {
                year: daysMonth[0].year,
                month: daysMonth[0].month,
                opsCount: daysMonth.length
            }
            months.push(month);
        }
    }
    
    //отсортировать месяцы по кол-ву операций от большего к меньшему и оставить первые 3 элемента
    let sortedMonth = [...months].sort((a, b) => (a.opsCount - b.opsCount) * -1);
    return sortedMonth.slice(0,3);
}

function task22(year, month, arr) {
    let monthArray = arr.filter(m => m.month == month && m.year == year);

    return {
        date: '2019-01-31',
        monthBalance: 1234,
        monthWithdrawal: 33,
        withdrawalRate: 0.11,
        rank: 'Золотой'
    };
}

function task23(arr) {
    return arr;
}