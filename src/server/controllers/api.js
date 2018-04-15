import fs from "fs";
import jsonDB from "node-json-db";
import path, { format } from "path";
import Constants from "../../constants";

const dbPath = path.join(process.cwd(), "birthdays.json");
const db = new jsonDB(dbPath, true, false);

function getCalenderData(req, res, next) {
  try {
    const responseJson = db.getData("/birthdays");
    const payload = {
      payload: responseJson
    };
    res.send(payload);
  } catch (error) {
    res.status(500);
  }
}

function addToCalendar(req, res, next) {
  if (req.body.birthdayJson && req.body.year) {
    const birthdayJson = JSON.parse(req.body.birthdayJson);
    const year = req.body.year;
    try {
      db.push(`/birthdays/${year}`, formatData(birthdayJson));
      const responseJson = db.getData("/birthdays");
      const payload = {
        payload: responseJson
      };
      res.send(payload);
    } catch (error) {
      res.status(500).send("Server Error =>");
    }
  } else {
    res.status(400);
    res.send("Param missing");
  }
}

function formatData(birthdayJson) {
  const retObj = {};
  Constants.weekDays.forEach((day, dayIndex) => {
    retObj[day] = [];
    for (let i = 0; i < birthdayJson.length; i++) {
      let birthday = birthdayJson[i].birthday;
      // const dateParts = birthday.split("/");
      // birthday = `${dateParts[2]}/${dateParts[1] - 1}/${dateParts[0]}`;
      if (dayIndex === new Date(birthday).getDay()) {
        const name = birthdayJson[i].name.replace(/  +/g, " ");

        const birthdayObj = {};
        if (birthdayJson[i].label) {
          birthdayObj.label = birthdayJson[i].label;
        } else {
          const nameSplit = name.split(" ");
          let label = nameSplit[0].charAt(0);
          if (nameSplit.length > 1) {
            label = label + nameSplit[1].charAt(0);
          }
          birthdayObj.label = label
        }
        birthdayObj.name = name;
        birthdayObj.birthday = birthday;
        birthdayObj.color =
          birthdayJson[i].color ||
          Constants.colorCodes[
            Math.floor(Math.random() * Constants.colorCodes.length)
          ];
        retObj[day].push(birthdayObj);
        retObj[day].sort(sorByDate).reverse();
      }
    }
  });

  return retObj;
}

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
}

function sorByDate(a, b) {
  return new Date(a.birthday).getTime() - new Date(b.birthday).getTime();
}

export default { addToCalendar, getCalenderData };
