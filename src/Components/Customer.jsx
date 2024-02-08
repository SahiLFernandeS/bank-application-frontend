import React, { useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import {
  Button,
  Input,
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
import { useNavigate } from "react-router-dom";

export default function Customer() {
  const [customer, setCustomer] = useState([]);
  const [pagination, setPagination] = useState(0);
  const [page, setPage] = React.useState(1);

  const navigate = useNavigate();

  const context = React.useContext(UserContext);

  var token = context.user.token;
  var payload = {};
  useEffect(() => {
    getCall(API.allCustomer + "?page=" + page, payload, token)
      .then((res) => {
        if (res.status === true) {
          setCustomer(res.data.rows);
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

  function handleClick(userId) {
    navigate("/transaction/" + userId, { state: { isAuth: true } });
  }

  function handleChange(event, value) {
    setPage(value);
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
            {["User ID", "Username", "Email", "role", "Created At"].map(
              (data) => (
                <TableCell
                  sx={{
                    display: "table-cell",
                  }}
                  key={data}
                >
                  <Typography variant="subtitle1">{data}</Typography>
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            display: "table-row-group",
            border: "none",
            color: "rgb(50, 53, 55)",
          }}
        >
          {customer?.map((data) => (
            <TableRow
              sx={{
                width: "100%",
                cursor: "pointer",
                display: "table-row",
              }}
              key={data.user_id}
              onClick={() => handleClick(data.user_id)}
            >
              <TableCell
                sx={{
                  display: "table-cell",
                }}
              >
                <Typography variant="subtitle1">{data.user_id}</Typography>
              </TableCell>
              <TableCell
                sx={{
                  display: "table-cell",
                }}
              >
                <Typography variant="subtitle1">{data.username}</Typography>
              </TableCell>
              <TableCell
                sx={{
                  display: "table-cell",
                }}
              >
                <Typography variant="subtitle1">{data.email}</Typography>
              </TableCell>
              <TableCell
                sx={{
                  display: "table-cell",
                }}
              >
                <Typography variant="subtitle1">{data.role}</Typography>
              </TableCell>
              <TableCell
                sx={{
                  display: "table-cell",
                }}
              >
                <Typography variant="subtitle1">{data.created_at}</Typography>
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
