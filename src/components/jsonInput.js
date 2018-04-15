import React, { PureComponent } from "react";
import autobind from "react-autobind";
import faker from "faker";

export default class JSONInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || "",
      err: null
    };
    autobind(this, "handleChange", "generateSampleJSON");
  }
  handleChange(event) {
    const { handleJsonInputChange } = this.props;
    const value = event.target.value;
    this.setState({ value: value });
    handleJsonInputChange(value)
  }
  getValue() {
    const { value } = this.state;
    return value;
  }
  generateSampleJSON() {
    const { handleJsonInputChange } = this.props;
    const fakeArrayCount = 30;
    const fakeArray = [];
    for (let i = 0; i < fakeArrayCount; i++) {
      const randomName = faker.name.findName();
      let randomBirthday = faker.date.past(50, new Date());
      randomBirthday =
        randomBirthday.getFullYear() +  // First month is "1"
        "/" +
        (randomBirthday.getMonth() + 1) +
        "/" +
        randomBirthday.getDate()
      fakeArray.push({
        name: randomName,
        birthday: randomBirthday
      });
    }
    const value = JSON.stringify(fakeArray, null, 2)
    this.setState({ value: value });
    handleJsonInputChange(value)
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }
  render() {
    const { day, dayDetails, err } = this.props;
    const { value } = this.state;
    return (
      <div className="json-input" onClick={this.selectRoute}>
        <textarea
          className="json-input-field"
          value={value}
          onChange={this.handleChange}
        />
        <div className="err-gen-link-wrap clearfix">
          <span className="generate-json-lnk" onClick={this.generateSampleJSON}>
            Generate Sample JSON
          </span>
          {err && <span className="form-err">{err}</span>}
        </div>
      </div>
    );
  }
}
