import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {FieldError, UseFormRegisterReturn} from 'react-hook-form';

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  placeholder?: string;
  autoComplete?: string;
  options?: {value: string; label: string}[];
  styleType?: 'form-group' | 'form-floating';
  value?: string;
  checked?: boolean;
  selectedDate?: Date;
  onDateChange?: (date: Date | null) => void;
  minDate?: Date;
  onCheckedChange?: (checked: boolean) => void;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  showLabel?: boolean;
  marginBottomClass?: string;
}

/**
 * A versatile form input component that supports various input types including text, select, checkbox, and date.
 *
 * @param {FormInputProps} props - The properties for the form input component.
 * @returns {JSX.Element} The rendered form input element.
 */
const FormInput = ({
  id,
  label,
  type,
  register,
  error,
  placeholder,
  autoComplete,
  options,
  styleType = 'form-floating',
  value,
  checked,
  selectedDate,
  onDateChange,
  minDate,
  onCheckedChange,
  onChange,
  showLabel = true,
  marginBottomClass = 'mb-3',
}: FormInputProps) => (
  <div className={`${styleType} ${marginBottomClass}`}>
    {showLabel && type !== 'checkbox' && styleType === 'form-group' && (
      <label htmlFor={id}>{label}</label>
    )}
    {type === 'select' ? (
      <select
        {...register}
        id={id}
        className='form-select'
        value={value}
        onChange={onChange}>
        {options?.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : type === 'checkbox' ? (
      <div className='form-check'>
        <input
          {...register}
          id={id}
          type={type}
          className='form-check-input'
          checked={checked}
          onChange={e => onCheckedChange?.(e.target.checked)}
        />
        <label htmlFor={id} className='form-check-label'>
          {label}
        </label>
      </div>
    ) : type === 'date' ? (
      <div className='datepicker-w-100'>
        <DatePicker
          selected={selectedDate}
          dateFormat='dd-MM-yyyy HH:mm'
          onChange={onDateChange}
          className='form-control'
          placeholderText={placeholder || label}
          minDate={minDate ?? undefined}
          showTimeSelect={false}
        />
      </div>
    ) : (
      <input
        {...register}
        id={id}
        type={type}
        className='form-control'
        autoComplete={autoComplete}
        placeholder={placeholder || label}
      />
    )}
    {type !== 'checkbox' && styleType === 'form-floating' && (
      <label htmlFor={id}>{label}</label>
    )}
    {error && <span className='text-danger'>{error.message}</span>}
  </div>
);

export default FormInput;
