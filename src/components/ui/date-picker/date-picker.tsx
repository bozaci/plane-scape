import { FC, useRef } from 'react';
import { Calendar } from 'react-modern-calendar-datepicker';
import { DatePickerProps } from './date-picker.type';
import { useOnClickOutside } from 'usehooks-ts';

import './date-picker.scss';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';

const DatePicker: FC<DatePickerProps> = ({ selectedDayRange, setSelectedDayRange, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleShowCalendar = () => {
    ref.current?.classList.toggle('is-active');
  };

  const handleCloseCalendar = () => {
    ref.current?.classList.remove('is-active');
  };

  useOnClickOutside(ref, handleCloseCalendar);

  return (
    <div ref={ref} className="date-picker">
      <div onClick={handleShowCalendar} className="date-picker__inner">
        {children}
      </div>
      <Calendar
        value={selectedDayRange}
        onChange={setSelectedDayRange}
        colorPrimary="#440891"
        colorPrimaryLight="rgb(68, 8, 145, 0.1)"
        shouldHighlightWeekends
      />
    </div>
  );
};

export default DatePicker;
