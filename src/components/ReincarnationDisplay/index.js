import React, { Component } from 'react';
import Submit from '../common/Submit';
import { postUsers } from '../../utilities/apiCalls';
import './styles.scss';

class ReincarnationDisplay extends Component {
  constructor() {
    super();
    this.state = {
      deathMatch: {},
      notes: ''
    };
  }

  componentDidMount = () => {
    this.setState({ deathMatch: this.props.deathsByDate });
  };

  handleNotes = e => {
    this.setState({ notes: e.target.value });
  };

  handleSubmit = e => {
    postUsers(this.props.username, this.props.deathsByDate, this.state.notes);
    this.props.getCleanUsers();
    this.props.showReincarnatedUsers();
    this.setState({ notes: '' });
  };

  render() {
    if (this.props.deathsByDate.length) {
      var name = Object.values(this.props.deathsByDate[0]);
      return (
        <article className="reincarnation-display">
          <h2 className="past-life-message">
            {this.props.username.toUpperCase()}!<br />
            you were
            <br />
            {name[1].toUpperCase()}
            <br />
            in your past life!
          </h2>
          <div className="comment-wrapper">
            <label>Leave a comment:</label>
            <div className="bottom-wrapper">
              <textarea
                className="comment"
                name="comment"
                onChange={this.handleNotes}
                value={this.state.notes}
              />
              <Submit buttonText="SAVE" handleSubmit={this.handleSubmit} />
            </div>
          </div>
        </article>
      );
    } else {
      return (
        <article className="reincarnation-display">
          <h2>Sorry no soul wanted to embody your body...</h2>
          <button onClick={this.props.tryAgain}>Try Again?</button>
        </article>
      );
    }
  }
}

export default ReincarnationDisplay;
