import React, { PureComponent } from "react";

export default class CalendarItem extends PureComponent {
  render() {
    const { day, dayDetails, calItemCss, cellWidth } = this.props;
    return (
      <div className="calendar-item" onClick={this.selectRoute}>
        <div className="ci-heading-wrap">
          <div className="ci-heading">{day}</div>
        </div>
        <div className="ci-content-wrap" style={calItemCss}>
          {dayDetails &&
            dayDetails.map((details, key) => {
              const calItemStyle = {
                backgroundColor: details.color,
                height: cellWidth || 0,
                width: cellWidth || 0
              };
              return (
                <span
                  key={`${details.name}_${key}`}
                  style={calItemStyle}
                  className="profile-box"
                >
                  {/* <div className="profile-details" style={{backgroundColor: details.color}}>
                    <div className="profile-content">
                      <div className="profile-name">{details.name}</div>
                      <div className="profile-bday">{details.birthday}</div>
                    </div>
                  </div> */}
                  <span className="profile-txt" title={details.birthday}>{details.label}</span>
                </span>
              );
            })}
        </div>
      </div>
    );
  }
}
