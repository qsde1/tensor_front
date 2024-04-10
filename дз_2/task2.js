
function task21(arr) {
    if(arr.length< 1)
        return 'массив не должен быть пустым';

    //формирование массива со статистикой по месяцам
    let months = [];
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
    let sortedMonth = [...months].sort((a, b) => (a.opsCount-b.opsCount)*-1);
    return sortedMonth.slice(0,3);
}

function task22(year, month, arr) {
    let monthArray = arr.filter(m => m.month == month && m.year == year);
    if(!monthArray.length){
        return 'такого года или месяца нет в массиве';
    }
    //последний день месяца в массиве
    let lastDayInMonth = Math.max(...monthArray.map(m => m.day));

    let monthReplenishment = monthArray.reduce((sum, item) => {
        if(item.type === 'replenishment')
            return sum + item.amount;
        else return sum;
    }, 0);

    let monthWithdrawal = monthArray.reduce((sum, item) => {
        if(item.type === 'withdrawal')
            return sum + item.amount;
        else return sum;
    }, 0);

    let monthPayment = monthArray.reduce((sum, item) => {
        if(item.type === 'payment')
            return sum + item.amount;
        else return sum;
    }, 0);

    let monthBalance = monthReplenishment - monthWithdrawal - monthPayment;
    let withdrawalRate = (monthWithdrawal+monthPayment)/monthReplenishment;
    
    let rank;
    if(withdrawalRate < 0.15)
        rank = 'Золотой';
    else if(withdrawalRate < 0.3)
        rank = 'Серебряный';
    else
        rank = 'Бронзовый';
    
    return {
        date: `${year}-${month.toString().length == 1 ? '0'+month : month}-${lastDayInMonth.toString().length == 1 ? '0'+lastDayInMonth : lastDayInMonth}`,
        monthBalance,
        monthWithdrawal,
        withdrawalRate:(Math.round(withdrawalRate*100))/100,
        rank,
    };
}

function task23(arr) {
    //массив объектов годов{number:number,months:[]), если в arr будет что-то кроме 2019
    let years = [];

    //получить все значения годов из общего массива
    arr.forEach(item => {
        if(!years.find(y=>y.number==item.year)){
            let year = {
                number:item.year,
                months: [],
            }

            years.push(year);
        }
    });
    //для каждого года получить его уникальные месяцы из общего массива
    let yearsNumbersArray = years.map(y => y.number);
    yearsNumbersArray.forEach(yNum => {
        let allMonthsByYear = arr.filter(a => a.year === yNum);//вообще все месяцы из общего массива для какого-то года
        let uniqueMonth = [];//уникальные значения месяцев
        allMonthsByYear.forEach(item => {
            if(!uniqueMonth.find(u =>u===item.month))
                uniqueMonth.push(item.month);
        })
        let yearIndex = years.findIndex(y => y.number = yNum);
        years[yearIndex].months = uniqueMonth;
    });

    let result = years.map(y=>{
        let monthsStats = [];
        y.months.reduce((totalBalance,m)=>{
            let stat = task22(y.number, m, arr);
            totalBalance += stat.monthBalance;
            monthsStats.push({
                ...stat,
                totalBalance,
            });
            return totalBalance;
        },0)
        return monthsStats;
    });
    return(result);
}