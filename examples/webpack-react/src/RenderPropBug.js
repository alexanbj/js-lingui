import React from 'react';
import { I18n } from '@lingui/react';

export default class extends React.Component {
  state = { value: '' };
  render() {
    return (
      <div>
      <span>Try typing in me. I lose focus</span>
      <I18n>
        {({ i18n }) => (
          <input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
          />
        )}
      </I18n>
      </div>
    );
  }
}