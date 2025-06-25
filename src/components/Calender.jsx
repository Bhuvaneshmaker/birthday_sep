import React from 'react';
import { getDaysInMonth, getFirstDayOfMonth } from '../utils/dateUtils';
import { hasBirthdayOnDate, isJoinDate } from '../services/employeeService';

const Calendar = ({ 
  currentMonth, 
  selectedDate, 
  setSelectedDate, 
  setCurrentMonth, 
  employees 
}) => {
  const changeMonth = (offset) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + offset);
    setCurrentMonth(newMonth);
  };

  const renderCalendar = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentMonth.getMonth() &&
        selectedDate.getFullYear() === currentMonth.getFullYear();

      const hasBday = hasBirthdayOnDate(employees, currentMonth, day);
      const hasJoin = isJoinDate(employees, currentMonth, day);

      days.push(
        <div
          key={day}
          className={`calendar-day ${isSelected ? 'selected' : ''} ${hasBday ? 'has-birthday' : ''}`}
          onClick={() =>
            setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))
          }
        >
          {day}
          {hasBday && <div className="birthday-indicator" style={{ fontSize: '30px' }}>🎂</div>}
          {hasJoin && <div className="join-indicator" style={{ fontSize: '30px' }}>⭐</div>}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="col-lg-8 mb-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="d-flex justify-between items-center mb-4">
          <button className="btn btn-outline-primary" onClick={() => changeMonth(-1)}>
            ← Previous
          </button>
          <h3 className="text-xl font-semibold text-center">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <button className="btn btn-outline-primary" onClick={() => changeMonth(1)}>
            Next →
          </button>
        </div>

        <div className="calendar-grid">
          <div className="calendar-header grid grid-cols-7 text-sm font-semibold mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="calendar-day-header">{day}</div>
            ))}
          </div>
          <div className="calendar-body">{renderCalendar()}</div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;