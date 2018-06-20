import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
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
            <DialogContentText>
              {`${language.START_DATE}: ${!displayEvent ? '' : displayEvent.startDate}`}
            </DialogContentText>
            <DialogContentText>
              {`${language.END_DATE}: ${!displayEvent ? '' : displayEvent.endDate}`}
            </DialogContentText>
            <DialogContentText>
              {`${language.RESSOURCES}: ${!displayEvent ? '' : displayEvent.ressources}`}
            </DialogContentText>
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
  eventData: PropTypes.object.isRequired,
  weekStartsOnMonday: PropTypes.bool.isRequired,
  language: PropTypes.object.isRequired,
};

WeekView.defaultProps = {
  start: 7,
  end: 19,
  style: {},
};
