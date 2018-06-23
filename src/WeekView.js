import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Day from './Day';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export default class WeekView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsDialogOpen: false,
      displayEvent: null,
    };
  }

  handleEventClick = (e) => {
    this.setState({ displayEvent: e, detailsDialogOpen: true });
  };

  handleClose = () => {
    this.setState({ displayEvent: null, detailsDialogOpen: false });
  };

  render() {
    const { displayEvent, detailsDialogOpen } = this.state;
    const { language, style, theme, displayDate, weekStartsOnMonday,
      eventData, start, end } = this.props;
    return (
      <div className="weekview" style={style}>
        <Dialog
          open={detailsDialogOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="event-details-dialog-title"
        >
          <DialogTitle id="event-details-dialog-title">
            {`${language.LESSON_DETAILS}: ${!displayEvent ? '' : displayEvent.title}`}
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2">
              {language.START_DATE}:
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '5px' }} >
              {!displayEvent ? '' : displayEvent.startDate}
            </Typography>
            <Typography variant="body2">
              {language.END_DATE}:
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '5px' }} >
              {!displayEvent ? '' : displayEvent.endDate}
            </Typography>
            <Typography variant="body2">
              {language.RESSOURCES}:
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '5px' }} >
              {!displayEvent ? '' : displayEvent.ressources.replace(/<[^>]*>/g, '')}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              {language.CLOSE}
            </Button>
          </DialogActions>
        </Dialog>
        {Array(7).fill().map((_, i) => {
          const dayMmt = (weekStartsOnMonday ? moment(displayDate).day(i + 1)
            : moment(displayDate).day(i));
          return (
            <Day
              id={dayMmt.format('DD.MM.YYYY')}
              start={start}
              end={end}
              onEventClick={this.handleEventClick}
              dayEvents={eventData[dayMmt.format('DD.MM.YYYY')]}
              key={`day${i}`}
              theme={theme}
              dayMoment={dayMmt}
              dayIndex={i}
            />);
        })}
      </div>
    );
  }
}

WeekView.propTypes = {
  start: PropTypes.number,
  end: PropTypes.number,
  style: PropTypes.object,
  theme: PropTypes.object.isRequired,
  displayDate: PropTypes.object.isRequired,
  eventData: PropTypes.object,
  weekStartsOnMonday: PropTypes.bool.isRequired,
  language: PropTypes.object.isRequired,
};

WeekView.defaultProps = {
  start: 7,
  end: 19,
  style: {},
  eventData: {},
};
