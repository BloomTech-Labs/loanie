import axios from 'axios';

export const CHANGE_TOKEN_ID = 'CHANGE_TOKEN_ID';
export const GET_MANAGER_LOANS = 'GET_MANAGER_LOANS';

export const changeTokenId = tokenId => ({
  type: CHANGE_TOKEN_ID,
  tokenId,
});

export const getManagerLoans = (managerId) => {
	const getManagerLoansEndpoint = 'http://localhost:3030/getmanagerloans';
	const getManagerLoansResponse = axios.post(getManagerLoansEndpoint, 
		{"loanManagerId": managerId});
	return {
		type: GET_MANAGER_LOANS,
		payload: getManagerLoansResponse
	};
}
