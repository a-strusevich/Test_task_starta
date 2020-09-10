calendar = {};

calendar.months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декбарь']; /* start from 0 to 11*/

calendar.day_name = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];  /* start from 0 to 6*/

calendar.current_date = {
    'date': null,
    'month': null,
    'year': null
};

let now = new Date();

calendar.current_date.year = now.getFullYear();
calendar.current_date.month = now.getMonth();
calendar.current_date.date = now.getDate();

let tmp = '';

tmp = '<p id = "heading" text-align = "center">' + calendar.current_date.year + '</p>';

/**/

function fill_month(month) {
    let total_days = 32 - new Date(year, (month - 1), 32).getDate();
    let start_day = new Date(year, month, date).getDay();
    if (start_day == 0) start_day = 6;
    let index = 0, fin_index = 35, day = 1;
    do {
        if (index % 7 == 0) {
            tmp += '<tr>';
        }
        // Пустые ячейки до начала месяца или после окончания
        if ((index < start_day) || (index >= (total_days + start_day))) {
            tmp += '<td>&nbsp;</td>';
        }
        else {
            let class_name = '';
            // Выбранный день
            if (calendar.current_date.year == day &&
                calendar.current_date.year == month &&
                calendar.current_date.year == year) {
                class_name = 'selected';
            }
            // Праздничный день
            else if (index % 7 == 6 || index % 7 == 5) {
                class_name = 'holiday';
            }
            // Ячейка с датой
            tmp += '<td class="' + class_name + '" ' +
                'onclick="calendar.selectDate(' +
                day + ',' + month + ',' + year + ');">' + day + '</td>';
            day++;
        }
        // Конец строки таблицы
        if (index % 7 == 6) {
            tmp += '</tr>';
        }
        index++;
    }
    while (index < fin_index);
}

/**/

for (let month = 0; month <= 11; month++) {
    let date = 1;
    tmp += '<div class = "month" id = "' + calendar.months[month] + '"><table>';
    /*fill <th> with month's title*/
    tmp += '<tr><th id = "month_title" colspan = "7">' + calendar.months[month] + '</th></tr><tr>';
    for (let day = 0; day <= 6; day++) {
        if (day >= 5) {
            tmp += '<td id = "holiday">' + calendar.day_name[day] + '</td>'
        } else {
            tmp += '<td>' + calendar.day_name[day] + '</td>'
        }
    }
    tmp += '</tr>'
    fill_month(month);
    tmp += '</table></div>'
}

document.getElementById('calendar_view').innerHTML = tmp;

