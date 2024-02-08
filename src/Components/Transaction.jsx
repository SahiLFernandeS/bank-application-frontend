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

export default function Transaction() {
  const [transaction, setTransaction] = useState([]);
  const [availableBal, setAvailableBal] = useState();
  const [openDeposit, setOpenDeposit] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [pagination, setPagination] = useState(0);
  const [page, setPage] = React.useState(1);

  const handleDepositOpen = () => setOpenDeposit(true);
  const handleDepositClose = () => setOpenDeposit(false);
  const handleWithdrawOpen = () => setOpenWithdraw(true);
  const handleWithdrawClose = () => setOpenWithdraw(false);
  const context = React.useContext(UserContext);

  var token = context.user.token;
  var payload = {};
  useEffect(() => {
    getCall(API.transaction + "?page=" + page, payload, token)
      .then((res) => {
        if (res.status === true) {
          setTransaction(res.data.rows);
          setPagination(res.data.totalPage);
          setAvailableBal(res.data.availableBalance);
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

  function handleDeposit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let amount = data.get("deposit");
    if (!amount || amount <= 0) {
      return;
    }
    var payload = {
      amount: amount,
      transactionType: "deposit",
    };

    postCall(API.withdrawOrDeposit, payload, token)
      .then((res) => {
        if (res.status === true) {
          setAvailableBal(res.data.amount);
          handleDepositClose();
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
  }

  function handleChange(event, value) {
    setPage(value);
  }

  function handleWithdraw(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let amount = data.get("withdraw");
    if (!amount || amount <= 0) {
      return;
    }
    var payload = {
      amount: amount,
      transactionType: "withdrawal",
    };

    postCall(API.withdrawOrDeposit, payload, token)
      .then((res) => {
        if (res.status === true) {
          setAvailableBal(res.data.amount);
          handleWithdrawClose();
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
  }

  return (
    <Box
      sx={{
        padding: "12px 16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: "16px",
          }}
        >
          Welcome {context.user.username}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: "16px",
          }}
        >
          Available Balance - ₹ {availableBal}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          sx={{
            margin: "0 12px",
          }}
          onClick={handleDepositOpen}
        >
          Deposit
        </Button>
        <Button variant="contained" onClick={handleWithdrawOpen}>
          Withdraw
        </Button>
      </Box>
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
      <Modal
        open={openDeposit}
        onClose={handleDepositClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          zIndex: 100,
        }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Deposit
          </Typography>
          <Box component="form" onSubmit={handleDeposit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="deposit"
              label="Deposit"
              name="deposit"
              autoFocus
              type="number"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Deposit
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openWithdraw}
        onClose={handleWithdrawClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          zIndex: 100,
        }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Withdraw
          </Typography>
          <Box component="form" onSubmit={handleWithdraw} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="withdraw"
              label="Withdraw"
              name="withdraw"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Withdraw
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
