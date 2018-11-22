import React from 'react'
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';

export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null,
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }))
  };

  onTextChange = (e) => (
    this.props.setTextFilter(e.target.value)
  )

  onSortChange = ({ target: { value } }) => (
    value==="date" ? (
      this.props.sortByDate()
    ) : (
      this.props.sortByAmount()
    )
  )


  render() {
    const { filters: {text, sortBy, startDate, endDate} } = this.props
    const { calendarFocused, focused } = this.state
    return(
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              className="text-input"
              placeholder="Search expenses"
              value={text}
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group__item">
          <select
            value={sortBy}
            onChange={this.onSortChange}
            className="select"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
          </div>
          <div className="input-group__item">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onDatesChange={this.onDatesChange}
            focusedInput={calendarFocused}
            onFocusChange={this.onFocusChange}
            showClearDates
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          </div>
        </div>
      </div>
    );
  }

};

const mapStateToProps = (state) => ({
  filters: state.filters,
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByAmount: () => dispatch(sortByAmount()),
  sortByDate: () => dispatch(sortByDate()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
