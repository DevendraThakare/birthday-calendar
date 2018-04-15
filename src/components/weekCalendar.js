import React, { PureComponent } from "react";
import autobind from "react-autobind";
import CalendarItem from "components/calendarItem";
import Constants from "constants";

const getColumnCount = n => {
  if (Math.sqrt(n) % 1 === 0) return Math.sqrt(n);
  const ceilInt = parseInt(Math.sqrt(n)) + 1;
  return ceilInt
};
// const getRowCount = n => {
//   if (Math.sqrt(n) % 1 === 0) return n;
//   const ceilInt = parseInt(Math.sqrt(n)) + 1;
//   return ceilInt;
// };

const calWidth = 157;
const calHeigth = 157;

export default class WeekCalendar extends PureComponent {
  render() {
    const { calendarData } = this.props;
    return (
      <div className="week-calendar">
        <div className="week-calendar-content">
          {Constants.weekDays.map((day, key) => {
            let dayDetails, rowCount, columnCount, cellWidth;
            const calItemCss = {};
            if (calendarData) {
              dayDetails = calendarData[day];
              if (dayDetails && dayDetails.length) {
                columnCount = getColumnCount(dayDetails.length);
                rowCount = Math.ceil(dayDetails.length/columnCount);
                cellWidth = Math.ceil(calWidth / columnCount);
                // cellHeight = Math.ceil(calWidth / columnCount);
                calItemCss.gridTemplateColumns = `repeat(${columnCount}, ${cellWidth}px)`;
                calItemCss.gridTemplateRows = `repeat(${rowCount}, ${cellWidth}px)`;
              }
            }
            return (
              <CalendarItem
                key={`${day}_${key}`}
                day={day}
                dayDetails={dayDetails}
                // columnCount={columnCount}
                cellWidth={cellWidth}
                calItemCss={calItemCss}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
