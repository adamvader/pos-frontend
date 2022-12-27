import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { BACKEND_URL } from "../constant";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const columnWidth = 200;

  useEffect(() => {
    const getTransactions = async () => {
      axios.get(`${BACKEND_URL}/transactions`).then((response) => {
        setTransactions(response.data);
      });
    };

    getTransactions();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: columnWidth },
    {
      field: "totalPrice",
      headerName: "Total Price",
      type: "number",
      width: columnWidth,
    },
    {
      field: "createdAt",
      headerName: "Date/Time",
      type: "date",
      width: columnWidth,
    },
  ];

  const rows = [...transactions];

  return (
    <Box
      sx={{
        mt: 18,
        height: "60vh",
        width: `100%`,
        backgroundColor: "#FFFFFF",
        borderRadius: 1,
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
};

export default Transactions;
