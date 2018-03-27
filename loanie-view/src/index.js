import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxPromise from "redux-promise";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import AccountCreation from "./Component/AccountCreation";
import AccountLogin from "./Component/AccountLogin";
import LoanList from "./Component/LoanList";
import Settings from "./Component/Settings";
import LoanCreate from "./Component/LoanCreate";
import Billing from "./Component/Billing";
import ClosedLoans from "./Component/ClosedLoans";
import MyLoans from "./Component/MyLoans";
import BorrowerSettings from "./Component/BorrowerSettings";
import PurchasePage from "./Component/PurchasePage";
import registerServiceWorker from "./registerServiceWorker";
import rootReducers from "./Reducers";

const configureStore = applyMiddleware(ReduxPromise)(createStore);
const store = configureStore(
  rootReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/new_account" component={AccountCreation} />
        <Route path="/login_user" component={AccountLogin} />
        <Route path="/loan_list" component={LoanList} />
        <Route path="/create_loan" component={LoanCreate} />
        <Route path="/closed_loans" component={ClosedLoans} />
        <Route path="/billing" component={Billing} />
        <Route path="/settings" component={Settings} />
        <Route path="/my_loans" component={MyLoans} />
        <Route path="/user_settings" component={BorrowerSettings} />
        <Route path="/purchase_loanie" component={PurchasePage} />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
