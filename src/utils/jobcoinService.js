import axios from 'axios';

const BASE_URL = 'http://jobcoin.gemini.com/tables/api';

export const fetchAddress = path =>
  axios
    .get(`${BASE_URL}${path}`)
    .then(res => res)
    .catch(err => err);

const postTransaction = (addressee, toAddress, amount) =>
  axios.post(`${BASE_URL}/transactions`, {
    fromAddress: addressee,
    toAddress,
    amount,
  });

const getTransactions = user => axios.get(`${BASE_URL}/addresses/${user}`);

export const postTransactionAndGetUpdatedTransactions = async (
  addressee,
  toAddress,
  amount,
) => {
  const postPromise = await postTransaction(addressee, toAddress, amount);
  const getPromise = await getTransactions(addressee);
  return await Promise.all([postPromise, getPromise]);
};
