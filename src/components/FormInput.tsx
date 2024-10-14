import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { convertToUTC } from '@/utils/convertToUTC';

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  placeholder?: string;
  autoComplete?: string;
  options?: { value: string; label: string }[];
  styleType?: 'form-group' | 'form-floating';
  value?: string;
  checked?: boolean;
  selectedDate?: Date;
  onDateChange?: (date: Date | null) => void;
  onCheckedChange?: (checked: boolean) => void;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  showLabel?: boolean;
  marginBottomClass?: string; 
}

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
        className="form-select"
        value={value}
        onChange={onChange}
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : type === 'checkbox' ? (
      <div className="form-check">
        <input
          {...register}
          id={id}
          type={type}
          className="form-check-input"
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
        />
        <label htmlFor={id} className="form-check-label">
          {label}
        </label>
      </div>
    ) : type === 'date' ? (
      <div className="datepicker-w-100">
        <DatePicker
          selected={selectedDate} 
          onChange={onDateChange}
          dateFormat="dd-MM-yyyy"
          className="form-control"
          placeholderText={placeholder || label}
          minDate={convertToUTC(new Date())}
        />
      </div>
    ) : (
      <input
        {...register}
        id={id}
        type={type}
        className="form-control"
        autoComplete={autoComplete}
        placeholder={placeholder || label}
      />
    )}
    {type !== 'checkbox' && styleType === 'form-floating' && (
      <label htmlFor={id}>{label}</label>
    )}
    {error && <span className="text-danger">{error.message}</span>}
  </div>
);

export default FormInput;
