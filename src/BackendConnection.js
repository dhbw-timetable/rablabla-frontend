import $ from 'jquery';

const publicDomain = 'to-be-defined.com';
const ajaxTarget = window.location.href.indexOf(publicDomain) === -1 ? publicDomain : '';

export default function getWeekEvents(url, mmt, success, error) {
  $.get(ajaxTarget, {
    url,
    startDate: mmt.format('YYYY-MM-DD'),
    endDate: mmt.format('YYYY-MM-DD'),
  }).done(success).fail(error);
}
