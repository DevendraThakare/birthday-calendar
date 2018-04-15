import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as homePageActions from "actions/homePage";
import autobind from "react-autobind";
import WeekCalendar from "components/weekCalendar";
import BirthdayForm from "components/birthdayForm";
import YearDrpdown from "components/yearsDropdown";

const mapStateToProps = state => ({
  calendarData: state.homePage.calendarData,
  selectedYear: state.homePage.selectedYear,
  selectedJSONString: state.homePage.selectedJSONString
});
const mapDispatchToProps = dispatch => ({
  dispatch,
  homePageActions: bindActionCreators(homePageActions, dispatch)
});
require("../styles/containers/homePage.scss");

class HomePage extends PureComponent {
  constructor(props) {
    super(props);
    autobind(this, "resetCalendar", "selectYear");
  }
  componentDidMount() {
    const { homePageActions } = this.props;
    homePageActions.getCalenderData();
  }
  resetCalendar() {
    const { dispatch } = this.props;
    dispatch({ type: "SET_SELECTED_YEAR", payload: "" });
    dispatch({ type: "SET_SELECTED_JSON_STRING", payload: "" });
  }
  selectYear(year) {
    const { dispatch, calendarData } = this.props;
    let selectedYearCalendar, jsonString;
    if (calendarData) {
      selectedYearCalendar = calendarData[year];
    }
    if (selectedYearCalendar) {
      jsonString = this.getJSONString(selectedYearCalendar);
    }
    dispatch({ type: "SET_SELECTED_YEAR", payload: year });
    dispatch({ type: "SET_SELECTED_JSON_STRING", payload: jsonString });
  }
  getJSONString(calendar) {
    return JSON.stringify(
      Object.keys(calendar).reduce((res, v) => {
        return res.concat(calendar[v]);
      }, []),
      null,
      2
    );
  }
  render() {
    const {
      dispatch,
      homePageActions,
      calendarData,
      selectedYear,
      selectedJSONString
    } = this.props;
    let selectedYearCalendar;
    if (calendarData && selectedYear) {
      selectedYearCalendar = calendarData[selectedYear];
    }
    let otherYears = [];
    if (calendarData) {
      otherYears = Object.keys(calendarData);
    }
    return (
      <div className="home-page">
        <div className="home-page-content">
          <div className="page-heading-wrap">
            <h1 className="page-heading">Birthday Cal</h1>
          </div>
          <YearDrpdown
            selectedYear={selectedYear}
            otherYears={otherYears}
            selectYear={this.selectYear}
          />
          <div className="calendar-wrap">
            <WeekCalendar calendarData={selectedYearCalendar} />
          </div>
          <div className="calendar-form-wrap">
            <BirthdayForm
              addToCalendar={homePageActions.addToCalendar}
              selectedYear={selectedYear}
              selectedJSONString={selectedJSONString}
              resetCalendar={this.resetCalendar}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
