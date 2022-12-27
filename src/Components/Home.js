import React from "react";
import { Link } from "react-router-dom";

import Transactions from "./TransactionsTable";

const Home = () => {
  return (
    <div>
      <Link to="/transactions/new">Sell</Link>
      <br />
      <Transactions />
    </div>
  );
};

export default Home;
