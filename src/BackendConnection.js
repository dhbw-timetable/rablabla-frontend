import $ from 'jquery';
import moment from 'moment';

const publicDomain = 'rablabla.m320trololol.com';
const productionBackend = 'https://backendrablabla.m320trololol.com';
const ajaxTarget = window.location.href.indexOf(publicDomain) !== -1 ? productionBackend : 'http://localhost:10010';
const sampleBackendResponse = {
  '18.06.2018': [
    {
      startDate: '08:30 18.06.2018',
      endDate: '10:30 18.06.2018',
      title: 'Klausur murmel',
      ressources: 'Hier könnte Ihre Werbung stehen.',
    },
    {
      startDate: '08:30 19.06.2018',
      endDate: '10:30 19.06.2018',
      title: 'Klausur holz',
      ressources: 'Hier könnte Ihre Werbung stehen.',
    },
    {
      startDate: '11:00 20.06.2018',
      endDate: '13:00 20.06.2018',
      title: 'Klausur Banane',
      ressources: 'Hier könnte Ihre Werbung stehen.',
    },
    {
      startDate: '11:00 21.06.2018',
      endDate: '12:00 21.06.2018',
      title: 'Klausur wichtig',
      ressources: 'Hier könnte Ihre Werbung stehen.',
    },
    {
      startDate: '11:00 22.06.2018',
      endDate: '13:00 22.06.2018',
      title: 'Klausur toll',
      ressources: 'Hier könnte Ihre Werbung stehen.',
    },
  ],
};

export default function getWeekEvents(url, mmt, success, error) {
  $.get(`${ajaxTarget}/events`, {
    url,
    // pre/postfetch events of +/-30 days
    startDate: moment(mmt).subtract(30, 'days').format('YYYY-MM-DD'),
    endDate: moment(mmt).add(30, 'days').format('YYYY-MM-DD'),
  }).done((resp) => {
    // XXX sometimtes it gets rapla ENOTFOUND -.-
    if (resp.errno) {
      error(resp);
    } else {
      success(prepareWeekEventData(sampleBackendResponse));
    }
  }).fail(error);
}

function prepareWeekEventData(weekBackendData) {
  const stateWeekData = {};
  Object.keys(weekBackendData).forEach((weekKey) => {
    weekBackendData[weekKey].forEach((eventObj) => {
      const startMmt = moment(eventObj.startDate, 'HH:mm DD.MM.YYYY');
      const endMmt = moment(eventObj.endDate, 'HH:mm DD.MM.YYYY');
      eventObj.startMmt = startMmt;
      eventObj.endMmt = endMmt;

      if (stateWeekData[startMmt.format('DD.MM.YYYY')]) {
        stateWeekData[startMmt.format('DD.MM.YYYY')].push(eventObj);
      } else {
        stateWeekData[startMmt.format('DD.MM.YYYY')] = [eventObj];
      }
    });
  });
  fixCollisions(stateWeekData);
  return stateWeekData;
}

function getMinuteValue(mmt) {
  return mmt.hours() * 60 + mmt.minutes();
}

// check if there's a collision between the events a and b
const intersects = (a, b) => {
  const startMinA = getMinuteValue(a.startMmt);
  const endMinA = getMinuteValue(a.endMmt);
  const startMinB = getMinuteValue(b.startMmt);
  const endMinB = getMinuteValue(b.endMmt);

  return (startMinA <= startMinB && endMinA >= endMinB) // a contains(equals) b
    || (startMinA >= startMinB && endMinA <= endMinB) // b contains(equals) a
    || (startMinA < startMinB && endMinA < endMinB && endMinA > startMinB) // a intersects b
    || (startMinA > startMinB && endMinA > endMinB && startMinA < endMinB) // b intersects a
  ;
};

// checks if the target event intersects any of the dayAgenda (except itself)
const intersectsAny = (targetEvent, dayAgenda) => {
  return dayAgenda.filter(evnt => evnt !== targetEvent && intersects(targetEvent, evnt)).length > 0;
};

function fixCollisions(stateWeekData) {
  Object.keys(stateWeekData).forEach((weekKey) => {
    const dailyEvents = [[], [], [], [], [], [], []];

    const events = stateWeekData[weekKey];

    events.forEach(el => dailyEvents[el.startMmt.day()].push(el));

    // for each day in week
    dailyEvents.forEach((dayAgenda) => {
      // a stack of columns
      const stacks = [[]];

      // for each event of this day
      dayAgenda.forEach((evnt) => {
        let i = 0, finish = false;
        while (!finish) {
          // if there'd be an intersection on this stack
          if (!intersectsAny(evnt, stacks[i])) {
            stacks[i].push(evnt);
            finish = true;
          } else {
            i++;
            // open up a new column
            if (stacks.length === i) {
              stacks.push([evnt]);
              finish = true;
            }
          }
        }
      });

      // assign the column values
      stacks.forEach((colLevel, i) => {
        colLevel.forEach((el) => {
          el.col = i;
          el.maxCol = stacks.length;
          el.intersections = dayAgenda.filter(evnt => evnt !== el && intersects(el, evnt)).length;
        });
      });
    });
  });
}
