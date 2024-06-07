document.addEventListener('DOMContentLoaded', () => {
    const calendarContainer = document.getElementById('calendar-container');
    const calendarMonthYear = document.getElementById('calendar-month-year');
    const calendarDates = document.getElementById('calendar-dates');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');

    let currentDate = new Date();

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const currentMonth = new Date(year, month);

        calendarMonthYear.textContent = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
        calendarDates.innerHTML = '';

        // Get the first day of the month (0: Sunday, 1: Monday, ..., 6: Saturday)
        const firstDay = new Date(year, month, 1).getDay();

        // Get the last day of the month
        const lastDate = new Date(year, month + 1, 0).getDate();

        // Get the last day of the previous month
        const lastDayPrevMonth = new Date(year, month, 0).getDate();

        // Create the dates for the previous month
        for (let i = firstDay; i > 0; i--) {
            const dateElement = document.createElement('div');
            dateElement.className = 'calendar-date';
            dateElement.textContent = lastDayPrevMonth - i + 1;
            dateElement.style.opacity = '0.5';
            calendarDates.appendChild(dateElement);
        }

        // Create the dates for the current month
        for (let i = 1; i <= lastDate; i++) {
            const dateElement = document.createElement('div');
            dateElement.className = 'calendar-date';
            dateElement.textContent = i;
            if (i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
                dateElement.classList.add('today');
            }
            calendarDates.appendChild(dateElement);
        }

        // Create the dates for the next month
        const remainingDays = 42 - (firstDay + lastDate);
        for (let i = 1; i <= remainingDays; i++) {
            const dateElement = document.createElement('div');
            dateElement.className = 'calendar-date';
            dateElement.textContent = i;
            dateElement.style.opacity = '0.5';
            calendarDates.appendChild(dateElement);
        }
    }

    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate);
});
