import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';

const useFormattedDate = (dateString: any) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (dateString) {
      const date = parseISO(dateString);

      if (!date || isNaN(date.getTime())) {
        console.error('Invalid date format.');
        setFormattedDate('');
      } else {
        const formatted = format(date, 'h:mm a');
        setFormattedDate(formatted);
      }
    }
  }, [dateString]);

  return formattedDate;
};

export default useFormattedDate;
