import { CalendarIcon } from '@components/Icons/Calendar';
import { format } from 'date-fns';
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import DatePicker from 'react-datepicker';
import { formatInTimeZone } from 'date-fns-tz';
import './index.css';

interface Props {
  onChange?: (date: string) => void;
}

export const DatetimePicker = ({ onChange }: Props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef(null);

  const handleChange = (date: Date) => {
    setStartDate(date);
  };

  const handleButtonClick = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleWindowClick = useCallback(
    (event: MouseEvent) => {
      const isCalendarClick = event
        .composedPath()
        .includes(calendarRef.current as any);

      if (!isCalendarClick) {
        setIsOpen(false);
      }
    },
    [calendarRef.current]
  );

  useEffect(() => {
    document.addEventListener('click', handleWindowClick);

    return () => {
      document.removeEventListener('click', handleWindowClick);
    };
  }, []);

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const dateFormatted = formatInTimeZone(startDate, timezone, `yyyy-MM-dd`);
    const timeFormatteed = formatInTimeZone(startDate, timezone, `HH:mm:ss`);
    const dateTimeFormatted = `${dateFormatted}T${timeFormatteed}`;

    if (onChange) {
      onChange(dateTimeFormatted);
    }
  }, [startDate, onChange]);

  return (
    <div className="date-time-picker__container">
      <button
        className="button button__primary button--small gap-2"
        onClick={handleButtonClick}
      >
        <CalendarIcon />
        {format(startDate, 'dd.MM.yyyy HH:mm')}
      </button>
      {isOpen && (
        <div ref={calendarRef} className="date-time-picker__wrapper">
          <DatePicker
            inline
            timeInputLabel="Время:"
            showTimeInput
            selected={startDate}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};
