import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  postTransactionAndGetUpdatedTransactions,
  fetchAddress,
} from '../../utils/jobcoinService';
import Spinner from 'react-spinkit';

import Card from '../../components/Card';
import Header from '../../components/Header';
import Chart from '../../components/Chart';

import './styles.css';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAddress: props.match.params.id,
      amount: '',
      isLoading: true,
      toAddress: '',
      error: {},
    };
  }

  componentDidMount = () => {
    const {pathname} = this.props.history.location;
    const {userAddress} = this.state;

    fetchAddress(pathname).then(res => {
      const {balance, transactions} = res.data;
      this.setState({
        balance,
        transactions,
        userAddress,
        isLoading: false,
      });
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const {userAddress, toAddress, amount} = this.state;

    this.setState({isLoading: true, toAddress: '', amount: ''});

    try {
      const [
        postResponse,
        getResponse,
      ] = await postTransactionAndGetUpdatedTransactions(
        userAddress,
        toAddress,
        amount,
      );
      this.setState({
        isLoading: false,
        transactions: getResponse.data.transactions,
        balance: getResponse.data.balance,
      });
    } catch (e) {
      console.warn(e);
      this.setState({error: e, isLoading: false});
    }
  };

  accumulateRunningBalances = () => {
    const {userAddress} = this.state;
    let runningBalance = 0;

    return this.state.transactions.map(transaction => {
      const {amount, timestamp, toAddress} = transaction;

      runningBalance =
        toAddress === userAddress
          ? (runningBalance += Number(amount))
          : (runningBalance -= Number(amount));

      return {
        ...transaction,
        x: new Date(timestamp),
        y: runningBalance,
      };
    });
  };

  render() {
    const {toAddress, amount, error} = this.state;
    const hasError = Object.keys(error).length > 0;
    const errorMessage = hasError ?  this.state.error.message : "";
    return (
      <div className="dashboard-grid">
        <Header title="Jobcoin Sender" />
        <aside>
          <Card title="Jobcoin Balance">
            {this.state.isLoading ? (
              <Spinner name="double-bounce" />
            ) : (
              <h3>{this.state.balance}</h3>
            )}
          </Card>
          <Card className="dashboard__transaction" title="Send Jobcoin">
            <form onSubmit={this.handleSubmit}>
              <label>
                <h5>Destination Address:</h5>
              </label>
              <input
                type="text"
                value={toAddress}
                onChange={e => this.setState({error: {}, toAddress: e.target.value})}
              />
              <label>
                <h5>Amound to Send:</h5>
              </label>
              <input
                className="input"
                type="text"
                value={amount}
                onChange={e => this.setState({error: {}, amount: e.target.value})}
              />
              <input type="submit" value="Send Jobcoins" />
              {hasError && (
                <div className="inline-error">{errorMessage}</div>
              )}
            </form>
          </Card>
        </aside>
        <article>
          <Card
            className="dashboard__history-card"
            title="Jobcoin History Graph">
            {!this.state.transactions || this.state.isLoading ? (
              <Spinner name="double-bounce" />
            ) : (
              <Chart data={this.accumulateRunningBalances()} />
            )}
          </Card>
        </article>
      </div>
    );
  }
}

DashboardContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default DashboardContainer;
