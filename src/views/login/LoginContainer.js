import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../logo.svg';
import LoginForm from './login';

import './styles.css';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  handleChange = event => {
    this.setState({value: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();
    const address = this.state.value;

    this.props.history.push(`/addresses/${address}`);
  }

  render() {
   return (
     <div className="login">
       <section className="login__form">
         <img src={logo} className="login__logo" alt="company-logo" />
         <LoginForm
           value={this.state.value}
           handleSubmit={this.handleSubmit}
           handleChange={this.handleChange}
         />
       </section>
     </div>
    );
  }
}

LoginContainer.propTypes = {
  history: PropTypes.object.isRequired,
};

export default LoginContainer;
