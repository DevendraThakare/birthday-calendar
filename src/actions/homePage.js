import axios from "axios";
getCalenderData;
export function getCalenderData() {
  return (dispatch, getState) => {
    let url = `/api/getCalenderData`;
    return axios({
      url: url,
      method: "GET"
    })
      .then(response => {
        const payload = response.data.payload;
        dispatch({
          type: "SET_CALENDERS",
          payload: { calendarData: payload }
        });
        return payload;
      })
      .catch(error => {
        throw new Error(error);
      });
  };
}
export function addToCalendar(year, jsonString) {
  return (dispatch, getState) => {
    let url = `/api/addToCalendar`;
    return axios({
      url: url,
      data: {
        year: year,
        birthdayJson: jsonString
      },
      method: "POST"
    })
      .then(response => {
        const payload = response.data.payload;
        const selectedYearCalendar = payload[year];
        const responseJsonString = getJSONString(selectedYearCalendar);
        dispatch({
          type: "SET_CALENDERS",
          payload: {
            calendarData: payload
          }
        });
        dispatch({
          type: "SET_SELECTED_YEAR",
          payload: year
        });
        dispatch({
          type: "SET_SELECTED_JSON_STRING",
          payload: responseJsonString
        });
        return payload;
      })
      .catch(error => {
        throw new Error(error);
      });
  };
}

function getJSONString(calendar) {
  return JSON.stringify(
    Object.keys(calendar).reduce((res, v) => {
      return res.concat(calendar[v]);
    }, []),
    null,
    2
  );
}
