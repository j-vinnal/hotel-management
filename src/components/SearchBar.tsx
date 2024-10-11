import { useSearch } from '@/states/contexts/SearchContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SearchBar = () => {
  const {
    guests,
    setGuests,
    checkinDate,
    setCheckinDate,
    checkoutDate,
    setCheckoutDate,
  } = useSearch();

  const commonStyle = {
    height: '40px',
  };

  return (
    <div
      className="d-flex align-items-center h-100 rounded bg-white p-2 shadow bg-light"
      style={{ gap: '10px' }}>
      {/* Dropdown for guest selection */}
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <select
          className="form-select w-100"
          aria-label="Guests select"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}>
          <option value="1">Guests: 1</option>
          <option value="2">Guests: 2</option>
          <option value="3">Guests: 3</option>
        </select>
      </div>

      {/* Divider */}
      <div
        className="border-end mx-2"
        style={{ height: '40px', borderColor: '#d3d3d3', width: '1px' }}></div>

      {/* Check-in DatePicker */}
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <DatePicker
          selected={checkinDate}
          onChange={(date) => setCheckinDate(date ?? undefined)}
          className="form-control w-100"
          placeholderText="Check in"
          style={commonStyle}
        />
      </div>

      {/* Divider */}
      <div
        className="border-end mx-2"
        style={{ height: '40px', borderColor: '#d3d3d3', width: '1px' }}></div>

      {/* Check-out DatePicker */}
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <DatePicker
          selected={checkoutDate}
          onChange={(date) => setCheckoutDate(date ?? undefined)}
          className="form-control w-100"
          placeholderText="Check out"
          style={commonStyle}
        />
      </div>

      {/* Search button */}
      <button
        className="btn btn-dark text-white px-4 flex-grow-1"
        style={commonStyle}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
