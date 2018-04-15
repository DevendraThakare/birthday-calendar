import React, { PureComponent } from "react";
import JSONInput from "components/jsonInput";
import autobind from "react-autobind";

export default class BirthdayForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      jsonInputErr: null,
      yearErr: null,
      jsonInput: props.selectedJSONString || "",
      year: props.selectedYear || ""
      // btnText: props.selectedYear ? 'RESET' : 'UPDATE'
    };
    this.yearInputRef = React.createRef();
    this.jsonInputRef = React.createRef();
    autobind(this, "handleSumbit", "onYearChange", "handleJsonInputChange");
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.selectedYear !== nextProps.selectedYear) {
      this.setState({ year: nextProps.selectedYear || "" });
    }
    if (this.props.selectedJSONString !== nextProps.selectedJSONString) {
      this.setState({ jsonInput: nextProps.selectedJSONString });
    }
  }
  handleSumbit(event) {
    const {
      addToCalendar,
      resetCalendar,
      selectedJSONString,
      selectedYear
    } = this.props;
    const { jsonInput, year } = this.state;
    if (selectedJSONString === jsonInput && year === selectedYear) {
      resetCalendar();
      this.setState({ jsonInput: "", year: "" });
      return;
    }
    const jsonString = this.jsonInputRef.current.getValue();
    // const year = this.yearInputRef.current.value;
    let isValid = true;
    if (!this.validateJSONInput(jsonString)) {
      isValid = false;
    }
    if (!this.validateYear(year)) {
      isValid = false;
    }
    if (isValid) {
      addToCalendar(year, jsonString);
    }
  }
  onYearChange(event) {
    const value = event.target.value;
    this.setState({ year: value });
  }
  handleJsonInputChange(jsonString) {
    this.setState({ jsonInput: jsonString });
  }
  validateYear(year) {
    const text = /^[0-9]+$/;
    if (year.length == 4) {
      if (year != 0) {
        if (year != "" && !text.test(year)) {
          this.setState({ yearErr: "Please Enter Numeric Values Only" });
          return false;
        }

        const current_year = new Date().getFullYear();
        if (year < current_year - 50 || year > current_year) {
          this.setState({
            yearErr: `Year should be in range ${current_year - 50} to current year`
          });
          return false;
        }
        this.setState({ yearErr: null });
        return true;
      }
    } else {
      this.setState({ yearErr: "Enter valid year" });
      return false;
    }
  }

  validateJSONInput(jsonString) {
    try {
      JSON.parse(jsonString);
    } catch (e) {
      this.setState({ jsonInputErr: "Enter valid JSON" });
      return false;
    }
    this.setState({ jsonInputErr: null });
    return true;
  }

  render() {
    const { jsonInputErr, yearErr, year, jsonInput } = this.state;
    const { selectedJSONString, selectedYear } = this.props;
    let btnText = "UPDATE";
    if (selectedJSONString === jsonInput && year === selectedYear) {
      if (jsonInput.trim() === "" && year === "") {
        btnText = "UPDATE";
      } else {
        btnText = "RESET";
      }
    }
    return (
      <div className="birthday-form">
        <div className="json-input-wrap">
          <JSONInput
            err={jsonInputErr}
            value={jsonInput}
            handleJsonInputChange={this.handleJsonInputChange}
            ref={this.jsonInputRef}
          />
        </div>
        <div className="year-field-btn-wrap">
          <div className="year-field-wrap">
            <div>
              <label className="year-field-label">Year</label>
              <input
                type="text"
                className="year-field"
                value={year}
                ref={this.yearInputRef}
                maxLength="4"
                placeholder="_._._._"
                onChange={this.onYearChange}
              />
            </div>
            <span className="form-err">{yearErr}</span>
          </div>
          <div className="btn-wrap">
            <span className="btn primary bf-submit" onClick={this.handleSumbit}>
              {btnText}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
