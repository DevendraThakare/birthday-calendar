import React from "react";
import Dropdown from "components/common/dropDown";
import autobind from "react-autobind";

export default class FilterDropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    autobind(this, "selectYear");
  }
  selectYear(e) {
    const { value } = e.currentTarget.dataset;
    this.props.selectYear(value);
  }
  render() {
    let { selectedYear, otherYears } = this.props;
    return (
      <Dropdown
        className="year-dropdown"
        toggleOnSelfClick
        header={
          <span className="filter-dropdown-header-content">
            <span className="filter-name">
              {selectedYear || 'Select Year'}
            </span>
            <i className="icon icon-arrow-down" />
          </span>
        }
      >
        <ul>
          {otherYears.map((year, id) => {
            return (
              <li
                key={year + id}
                className="year-elem"
                onClick={this.selectYear}
                data-value={year}
              >
                {year}
              </li>
            );
          })}
        </ul>
      </Dropdown>
    );
  }
}
