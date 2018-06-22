import $ from 'jquery';
import moment from 'moment';

const publicDomain = 'rablabla.m320trololol.com';
const productionBackend = 'https://wailord:9001';
const ajaxTarget = window.location.href.indexOf(publicDomain) !== -1 ? productionBackend : 'http://localhost:10010';
/* const sampleBackendResponse = {
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
}; */

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
      success(prepareWeekEventData(resp));
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

function fixCollisions() {
}
