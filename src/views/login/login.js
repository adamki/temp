import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../components/Card';

const LoginForm = ({
  handleSubmit,
  handleChange,
  value,
}) => (
  <Card
    dataTest='login-card'
    title='Welcome! Sign in With your Jobcoin Address'
  >
    <form onSubmit={handleSubmit}>
      <label>
        <h5>Jobcoin Address:</h5>
      </label>
      <input
        data-test="login-addressee"
        type="text"
        value={value}
        onChange={handleChange}
      />
      <input type="submit" value="Submit" />
    </form>
  </Card>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default LoginForm;
