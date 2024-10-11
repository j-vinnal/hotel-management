import { useSearch } from '@/states/contexts/SearchContext';

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
      <div className="flex-grow-1">
        <select
          className="form-select w-100"
          aria-label="Guests select"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          style={{ ...commonStyle, fontSize: '20px' }}>
          <option value="1">Guests: 1</option>
          <option value="2">Guests: 2</option>
          <option value="3">Guests: 3</option>
        </select>
      </div>

      {/* Divider */}
      <div
        className="border-end"
        style={{ height: '40px', borderColor: '#d3d3d3', width: '1px' }}></div>

      {/* Check-in input */}
      <div className="flex-grow-1">
        <div className="form-floating">
          <input
            type="text"
            className="form-control w-100"
            id="checkin"
            placeholder="DD.MM.YY"
            value={checkinDate}
            onChange={(e) => setCheckinDate(e.target.value)}
            style={commonStyle}
          />
          <label htmlFor="checkin">Check in</label>
        </div>
      </div>

      {/* Divider */}
      <div
        className="border-end"
        style={{ height: '40px', borderColor: '#d3d3d3', width: '1px' }}></div>

      {/* Check-out input */}
      <div className="flex-grow-1">
        <div className="form-floating">
          <input
            type="text"
            className="form-control w-100"
            id="checkout"
            placeholder="DD.MM.YY"
            value={checkoutDate}
            onChange={(e) => setCheckoutDate(e.target.value)}
            style={commonStyle}
          />
          <label htmlFor="checkout">Check out</label>
        </div>
      </div>

      {/* Search button */}
      <button className="btn btn-dark text-white px-4 flex-grow-1" style={commonStyle}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
