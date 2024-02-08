import React, { useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import {
  Button,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { TableCell } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableBody } from "@mui/material";
import { Table } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { getCall, postCall } from "../services";
import { API } from "../Api";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

export default function TransactionById() {
  const { userId } = useParams();
  const [transaction, setTransaction] = useState([]);
  const [pagination, setPagination] = useState(0);
  const [page, setPage] = React.useState(1);

  const context = React.useContext(UserContext);

  var token = context.user.token;
  var payload = {};
  useEffect(() => {
    getCall(
      API.customerTransaction + "/" + userId + "?page=" + page,
      payload,
      token
    )
      .then((res) => {
        if (res.status === true) {
          setTransaction(res.data.rows);
          setPagination(res.data.totalPage);
        } else {
          Swal.fire({
            title: res.message,
            icon: "error",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: err.message,
          icon: "error",
        });
      });
  }, [page]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  function handleChange(event, value) {
    setPage(value);
  }

  return (
    <Box
      sx={{
        padding: "12px 16px",
      }}
    >
      <Table
        sx={{
          paddingTop: "20px",
          width: "100%",
          display: "table",
          borderCollapse: "collapse",
        }}
      >
        <TableHead sx={{ width: "100%", display: "table-header-group" }}>
          <TableRow
            sx={{
              display: "table-row",
              borderBottom: "1px solid rgb(230,230,231)",
            }}
          >
            {["TXN ID", "TXN Type", "Amount", "Created At"].map((data) => (
              <TableCell
                sx={{
                  display: "table-cell",
                }}
                key={data}
              >
                <Typography variant="subtitle1">{data}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            display: "table-row-group",
            border: "none",
            color: "rgb(50, 53, 55)",
          }}
        >
          {transaction?.map((data) => (
            <TableRow
              sx={{
                width: "100%",
                cursor: "pointer",
                display: "table-row",
              }}
              key={data.transaction_id}
            >
              <TableCell
                sx={{
                  display: "table-cell",
                }}
              >
                <Typography variant="subtitle1">
                  {data.transaction_id}
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  display: "table-cell",
                }}
              >
                <Typography variant="subtitle1">
                  {data.transaction_type}
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  display: "table-cell",
                }}
              >
                <Typography variant="subtitle1">{data.amount}</Typography>
              </TableCell>
              <TableCell
                sx={{
                  display: "table-cell",
                }}
              >
                <Typography variant="subtitle1">
                  {data.transaction_date}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        sx={{
          display: "flex",
          padding: "12px 16px",
          justifyContent: "center",
        }}
      >
        <Stack spacing={2}>
          <Pagination
            count={pagination}
            page={page}
            onChange={handleChange}
            color="primary"
          />
        </Stack>
      </Box>
    </Box>
  );
}
