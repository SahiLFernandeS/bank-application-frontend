import React, { useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { Typography } from "@mui/material";
import { Checkbox } from "@mui/material";
import { TableCell } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Stack } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableBody } from "@mui/material";
import { Table } from "@mui/material";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import { getCall, postCall } from "../services";
import { API } from "../Api";
import Swal from "sweetalert2";

export default function Transaction() {
  const [transaction, setTransaction] = useState([]);
  const context = React.useContext(UserContext);

  var token = context.user.token;
  var payload = {};
  useEffect(() => {
    getCall(API.transaction, payload, token)
      .then((res) => {
        if (res.status === true) {
          setTransaction(res.data);
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
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1080px",
        padding: "20px",
        backgroundColor: "rgb(255, 255, 255)",
      }}
    >
      <Container>
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
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  padding: "10px 12px",
                  width: "13%",
                  minWidth: "87px",
                  display: "table-cell",
                  color: "rgb(101, 101, 102)",
                  fontSize: "15px",
                }}
              >
                <Typography variant="subtitle1">Type</Typography>
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  padding: "10px 12px",
                  width: "15%",
                  display: "table-cell",
                  color: "rgb(101, 101, 102)",
                  fontSize: "15px",
                }}
              >
                <Typography variant="subtitle1">Project</Typography>
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  padding: "10px 12px",
                  width: "12%",
                  minWidth: "100px",
                  display: "table-cell",
                  whiteSpace: "nowrap",
                  color: "rgb(101, 101, 102)",
                  fontSize: "15px",
                }}
              >
                <Typography variant="subtitle1">Created by</Typography>
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  padding: "10px 12px",
                  width: "18%",
                  minWidth: "152px",
                  display: "table-cell",
                  color: "rgb(101, 101, 102)",
                  fontSize: "15px",
                }}
              >
                <Typography variant="subtitle1">Viewed / Modified</Typography>
              </TableCell>
              <TableCell
                sx={{ width: "4.5%", display: "table-cell", minWidth: "28px" }}
              >
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4PSIwIiB5PSIwIiB2aWV3Qm94PSIwIDAgNjgyLjY2NyA2ODIuNjY3IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48ZGVmcz48Y2xpcFBhdGggaWQ9ImEiIGNsaXBQYXRoVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNMCA1MTJoNTEyVjBIMFoiIGZpbGw9IiNhNGE5YTkiIG9wYWNpdHk9IjEiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiPjwvcGF0aD48L2NsaXBQYXRoPjwvZGVmcz48ZyBjbGlwLXBhdGg9InVybCgjYSkiIHRyYW5zZm9ybT0ibWF0cml4KDEuMzMzMzMgMCAwIC0xLjMzMzMzIDAgNjgyLjY2NykiPjxwYXRoIGQ9Ik0wIDBhMTkxLjc4MyAxOTEuNzgzIDAgMCAwIDQ5LjcxOS0yMC42MzhsMTUuNjg4IDE1LjY5YTMyLjEyMSAzMi4xMjEgMCAwIDAgMjIuNzI3IDkuNDE1IDMyLjExNiAzMi4xMTYgMCAwIDAgMjIuNzE4LTkuNDE1bDIyLjcxOC0yMi43MTlhMzIuMTEgMzIuMTEgMCAwIDAgOS40MTUtMjIuNzE4IDMyLjExMyAzMi4xMTMgMCAwIDAtOS40MTUtMjIuNzI2TDExNy44ODEtODguOGExOTEuODM4IDE5MS44MzggMCAwIDAgMjAuNjM4LTQ5LjcxOWgyMi4xNDdjMTcuNzQ2IDAgMzIuMTM0LTE0LjM4OCAzMi4xMzQtMzIuMTMzdi0zMi4xMzRjMC0xNy43NDUtMTQuMzg4LTMyLjEzMy0zMi4xMzQtMzIuMTMzaC0yMi4xNDdhMTkxLjgzMSAxOTEuODMxIDAgMCAwLTIwLjYzOC00OS43MThsMTUuNjg5LTE1LjY4OWEzMi4xMTcgMzIuMTE3IDAgMCAwIDkuNDE1LTIyLjcyNyAzMi4xMSAzMi4xMSAwIDAgMC05LjQxNS0yMi43MThsLTIyLjcxOC0yMi43MThhMzIuMTEyIDMyLjExMiAwIDAgMC0yMi43MTgtOS40MTUgMzIuMTE3IDMyLjExNyAwIDAgMC0yMi43MjcgOS40MTVMNDkuNzE5LTM1Mi44QTE5MS43OCAxOTEuNzggMCAwIDAgMC0zNzMuNDM3di0yMi4xNDhjMC0xNy43NDYtMTQuMzg4LTMyLjEzNC0zMi4xMzQtMzIuMTM0aC0zMi4xMzNjLTE3Ljc0NiAwLTMyLjEzMyAxNC4zODgtMzIuMTMzIDMyLjEzNHYyMi4xNDhhMTkxLjc4IDE5MS43OCAwIDAgMC00OS43MTkgMjAuNjM3bC0xNS42ODktMTUuNjg5YTMyLjExNSAzMi4xMTUgMCAwIDAtMjIuNzI2LTkuNDE1IDMyLjEwOCAzMi4xMDggMCAwIDAtMjIuNzE4IDkuNDE1bC0yMi43MTkgMjIuNzE4YTMyLjExNCAzMi4xMTQgMCAwIDAtOS40MTUgMjIuNzE4IDMyLjEyMSAzMi4xMjEgMCAwIDAgOS40MTUgMjIuNzI3bDE1LjY5IDE1LjY4OWExOTEuNzk2IDE5MS43OTYgMCAwIDAtMjAuNjM4IDQ5LjcxOGgtMjIuMTQ3Yy0xNy43NDYgMC0zMi4xMzQgMTQuMzg4LTMyLjEzNCAzMi4xMzN2MzIuMTM0YzAgMTcuNzQ1IDE0LjM4OCAzMi4xMzMgMzIuMTM0IDMyLjEzM2gyMi4xNDdBMTkxLjgwMyAxOTEuODAzIDAgMCAwLTIxNC4yODEtODguOGwtMTUuNjkgMTUuNjg5YTMyLjExNyAzMi4xMTcgMCAwIDAtOS40MTUgMjIuNzI2IDMyLjExNCAzMi4xMTQgMCAwIDAgOS40MTUgMjIuNzE4bDIyLjcxOSAyMi43MTlhMzIuMTEyIDMyLjExMiAwIDAgMCAyMi43MTggOS40MTUgMzIuMTE5IDMyLjExOSAwIDAgMCAyMi43MjYtOS40MTVsMTUuNjg5LTE1LjY5QTE5MS43ODMgMTkxLjc4MyAwIDAgMC05Ni40IDB2MjIuMTQ4YzAgMTcuNzQ2IDE0LjM4NyAzMi4xMzMgMzIuMTMzIDMyLjEzM2gzMi4xMzNDLTE0LjM4OCA1NC4yODEgMCAzOS44OTQgMCAyMi4xNDhaIiBzdHlsZT0ic3Ryb2tlLXdpZHRoOjMwO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzA0LjIgNDQyLjcxOSkiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2E0YTlhOSIgc3Ryb2tlLXdpZHRoPSIzMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIHN0cm9rZS1vcGFjaXR5PSIiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIG9wYWNpdHk9IjEiPjwvcGF0aD48cGF0aCBkPSJNMCAwYzUzLjIwNSAwIDk2LjQtNDMuMTk1IDk2LjQtOTYuNCAwLTUzLjIwNC00My4xOTUtOTYuNC05Ni40LTk2LjQtNTMuMjA1IDAtOTYuNCA0My4xOTYtOTYuNCA5Ni40Qy05Ni40LTQzLjE5NS01My4yMDUgMCAwIDBaIiBzdHlsZT0ic3Ryb2tlLXdpZHRoOjMwO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjU2IDM1Mi40KSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYTRhOWE5IiBzdHJva2Utd2lkdGg9IjMwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0ibm9uZSIgc3Ryb2tlLW9wYWNpdHk9IiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgb3BhY2l0eT0iMSI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
                  style={{ margin: "auto", width: "20px", height: "20px" }}
                  width="20px"
                  height="20px"
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              display: "table-row-group",
              border: "none",
              color: "rgb(50, 53, 55)",
            }}
          >
            <TableRow
              sx={{
                width: "100%",
                cursor: "pointer",
                display: "table-row",
                border: "none",
                borderBottom: "1px solid rgb(230,230,231)",
              }}
            >
              <TableCell
                sx={{
                  display: "table-cell",
                  padding: "8px 12px",
                  " @media(max-width:991px)": { fontSize: "14px" },
                  " @media(max-width:479px)": { fontSize: "13px" },
                }}
              >
                <Stack
                  sx={{
                    fontFamily: "Inter",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    alignItems: "center",
                    color: "rgb(101, 101, 102)",
                    fontSize: "15px",
                  }}
                  spacing="10px"
                  direction="row"
                >
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4PSIwIiB5PSIwIiB2aWV3Qm94PSIwIDAgMTMuMjI5IDEzLjIyOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+PHBhdGggZmlsbD0iI2FlZDZmZCIgZD0iTTEwLjkwMyAxMS4xMzNhLjUzLjUzIDAgMCAxLS41My41M2gtNy40MmEuNTMuNTMgMCAwIDEtLjUzLS41M3YtOS4wMWEuNTMuNTMgMCAwIDEgLjUzLS41M2g1LjNsMi42NSAyLjY1eiIgb3BhY2l0eT0iMSIgZGF0YS1vcmlnaW5hbD0iI2VjZjVmZiIgY2xhc3M9IiI+PC9wYXRoPjxwYXRoIGZpbGw9IiM2ZmE5ZTciIGQ9Ik0xMC43NyA0LjI0M0g4Ljc4M2EuNTMuNTMgMCAwIDEtLjUzLS41M1YxLjcyNSIgb3BhY2l0eT0iMSIgZGF0YS1vcmlnaW5hbD0iI2JkZGRmZiIgY2xhc3M9IiI+PC9wYXRoPjxwYXRoIGZpbGw9IiM2ZmE5ZTciIGQ9Ik0yLjk1MyAxLjMyOGEuOC44IDAgMCAwLS43OTUuNzk1djkuMDFhLjguOCAwIDAgMCAuNzk1Ljc5NWg3LjQyYS44LjggMCAwIDAgLjc5NS0uNzk1di02Ljg5YS4yNjUuMjY1IDAgMCAwLS4wNzgtLjE4N2wtMi42NS0yLjY1YS4yNjUuMjY1IDAgMCAwLS4xODctLjA3OHptMCAuNTNoNS4wMzV2MS44NTVhLjguOCAwIDAgMCAuNzk1Ljc5NWgxLjg1NXY2LjYyNWMwIC4xNS0uMTE2LjI2NS0uMjY1LjI2NWgtNy40MmEuMjYxLjI2MSAwIDAgMS0uMjY1LS4yNjV2LTkuMDFjMC0uMTUuMTE2LS4yNjUuMjY1LS4yNjV6bTUuNTY1LjM3NSAxLjc0NSAxLjc0NWgtMS40OGEuMjYxLjI2MSAwIDAgMS0uMjY1LS4yNjV6TTQuNDExIDMuOTc4YS4yNjUuMjY1IDAgMCAwLS4yNjUuMjY1LjI2NS4yNjUgMCAwIDAgLjI2NS4yNjVoMi4zODVhLjI2NS4yNjUgMCAwIDAgLjI2NS0uMjY1LjI2NS4yNjUgMCAwIDAtLjI2NS0uMjY1em0wIDEuNTlhLjI2NS4yNjUgMCAwIDAtLjI2NS4yNjUuMjY1LjI2NSAwIDAgMCAuMjY1LjI2NWg0LjUwNWEuMjY1LjI2NSAwIDAgMCAuMjY1LS4yNjUuMjY1LjI2NSAwIDAgMC0uMjY1LS4yNjV6bTAgMS41OWEuMjY1LjI2NSAwIDAgMC0uMjY1LjI2NS4yNjUuMjY1IDAgMCAwIC4yNjUuMjY1aDQuNTA1YS4yNjUuMjY1IDAgMCAwIC4yNjUtLjI2NS4yNjUuMjY1IDAgMCAwLS4yNjUtLjI2NXptMCAxLjU5YS4yNjUuMjY1IDAgMCAwLS4yNjUuMjY1LjI2NS4yNjUgMCAwIDAgLjI2NS4yNjVoNC41MDVhLjI2NS4yNjUgMCAwIDAgLjI2NS0uMjY1LjI2NS4yNjUgMCAwIDAtLjI2NS0uMjY1eiIgb3BhY2l0eT0iMSIgZGF0YS1vcmlnaW5hbD0iIzNkOWNlMiIgY2xhc3M9IiI+PC9wYXRoPjwvZz48L3N2Zz4="
                    style={{ height: "32px", width: "32px" }}
                    width="25px"
                    height="25px"
                  />
                  <InputLabel>Sample Course - Automobile</InputLabel>
                </Stack>
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  padding: "10px 12px",
                  display: "table-cell",
                  fontSize: "15px",
                  color: "rgb(50, 53, 55)",
                  " @media(max-width:991px)": { fontSize: "14px" },
                  " @media(max-width:479px)": { fontSize: "13px" },
                }}
              >
                <Typography variant="subtitle1">Course</Typography>
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  padding: "10px 12px",
                  display: "table-cell",
                  fontSize: "15px",
                  color: "rgb(50, 53, 55)",
                  " @media(max-width:991px)": { fontSize: "14px" },
                  " @media(max-width:479px)": { fontSize: "13px" },
                }}
              >
                <Typography variant="subtitle1" sx={{ width: "fit-content" }}>
                  Sample Materials
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  padding: "10px 12px",
                  display: "table-cell",
                  fontSize: "15px",
                  textAlign: "center",
                  color: "rgb(50, 53, 55)",
                  " @media(max-width:991px)": { fontSize: "14px" },
                  " @media(max-width:479px)": { fontSize: "13px" },
                }}
              >
                <Typography variant="subtitle1" sx={{ width: "fit-content" }}>
                  You
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  display: "table-cell",
                  padding: "10px 12px",
                  fontSize: "15px",
                  color: "rgb(50, 53, 55)",
                  " @media(max-width:991px)": { fontSize: "14px" },
                  " @media(max-width:479px)": { fontSize: "13px" },
                }}
              >
                <Typography variant="subtitle1" sx={{ width: "fit-content" }}>
                  Nov 23, 2023, 4:30 PM
                </Typography>
              </TableCell>
              <TableCell sx={{ display: "table-cell", minWidth: "28px" }}>
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4PSIwIiB5PSIwIiB2aWV3Qm94PSIwIDAgNDI2LjY2NyA0MjYuNjY3IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIiBjbGFzcz0iIj48Zz48Y2lyY2xlIGN4PSI0Mi42NjciIGN5PSIyMTMuMzMzIiByPSI0Mi42NjciIGZpbGw9IiM3Njc5NzkiIG9wYWNpdHk9IjEiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjIxMy4zMzMiIGN5PSIyMTMuMzMzIiByPSI0Mi42NjciIGZpbGw9IiM3Njc5NzkiIG9wYWNpdHk9IjEiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjM4NCIgY3k9IjIxMy4zMzMiIHI9IjQyLjY2NyIgZmlsbD0iIzc2Nzk3OSIgb3BhY2l0eT0iMSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCI+PC9jaXJjbGU+PC9nPjwvc3ZnPg=="
                  style={{ margin: "auto", width: "20px", height: "20px" }}
                  width="20px"
                  height="20px"
                />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                width: "100%",
                cursor: "pointer",
                display: "table-row",
                border: "none",
                borderBottom: "1px solid rgb(230,230,231)",
              }}
            >
              <TableCell
                sx={{
                  display: "table-cell",
                  padding: "8px 12px",
                  " @media(max-width:991px)": { fontSize: "14px" },
                  " @media(max-width:479px)": { fontSize: "13px" },
                }}
              >
                <Stack
                  sx={{
                    fontFamily: "Inter",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    alignItems: "center",
                    color: "rgb(101, 101, 102)",
                    fontSize: "15px",
                  }}
                  spacing="10px"
                  direction="row"
                >
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4PSIwIiB5PSIwIiB2aWV3Qm94PSIwIDAgMTMuMjI5IDEzLjIyOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+PHBhdGggZmlsbD0iIzM5ZDljZiIgZD0iTTEwLjkwMyAxMS4xMzNhLjUzLjUzIDAgMCAxLS41My41M2gtNy40MmEuNTMuNTMgMCAwIDEtLjUzLS41M3YtOS4wMWEuNTMuNTMgMCAwIDEgLjUzLS41M2g1LjNsMi42NSAyLjY1eiIgb3BhY2l0eT0iMSIgZGF0YS1vcmlnaW5hbD0iI2VjZjVmZiIgY2xhc3M9IiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMxMTExMTEiIGQ9Ik0xMC43NyA0LjI0M0g4Ljc4M2EuNTMuNTMgMCAwIDEtLjUzLS41M1YxLjcyNSIgb3BhY2l0eT0iMSIgZGF0YS1vcmlnaW5hbD0iI2JkZGRmZiIgY2xhc3M9IiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMxMTExMTEiIGQ9Ik0yLjk1MyAxLjMyOGEuOC44IDAgMCAwLS43OTUuNzk1djkuMDFhLjguOCAwIDAgMCAuNzk1Ljc5NWg3LjQyYS44LjggMCAwIDAgLjc5NS0uNzk1di02Ljg5YS4yNjUuMjY1IDAgMCAwLS4wNzgtLjE4N2wtMi42NS0yLjY1YS4yNjUuMjY1IDAgMCAwLS4xODctLjA3OHptMCAuNTNoNS4wMzV2MS44NTVhLjguOCAwIDAgMCAuNzk1Ljc5NWgxLjg1NXY2LjYyNWMwIC4xNS0uMTE2LjI2NS0uMjY1LjI2NWgtNy40MmEuMjYxLjI2MSAwIDAgMS0uMjY1LS4yNjV2LTkuMDFjMC0uMTUuMTE2LS4yNjUuMjY1LS4yNjV6bTUuNTY1LjM3NSAxLjc0NSAxLjc0NWgtMS40OGEuMjYxLjI2MSAwIDAgMS0uMjY1LS4yNjV6TTQuNDExIDMuOTc4YS4yNjUuMjY1IDAgMCAwLS4yNjUuMjY1LjI2NS4yNjUgMCAwIDAgLjI2NS4yNjVoMi4zODVhLjI2NS4yNjUgMCAwIDAgLjI2NS0uMjY1LjI2NS4yNjUgMCAwIDAtLjI2NS0uMjY1em0wIDEuNTlhLjI2NS4yNjUgMCAwIDAtLjI2NS4yNjUuMjY1LjI2NSAwIDAgMCAuMjY1LjI2NWg0LjUwNWEuMjY1LjI2NSAwIDAgMCAuMjY1LS4yNjUuMjY1LjI2NSAwIDAgMC0uMjY1LS4yNjV6bTAgMS41OWEuMjY1LjI2NSAwIDAgMC0uMjY1LjI2NS4yNjUuMjY1IDAgMCAwIC4yNjUuMjY1aDQuNTA1YS4yNjUuMjY1IDAgMCAwIC4yNjUtLjI2NS4yNjUuMjY1IDAgMCAwLS4yNjUtLjI2NXptMCAxLjU5YS4yNjUuMjY1IDAgMCAwLS4yNjUuMjY1LjI2NS4yNjUgMCAwIDAgLjI2NS4yNjVoNC41MDVhLjI2NS4yNjUgMCAwIDAgLjI2NS0uMjY1LjI2NS4yNjUgMCAwIDAtLjI2NS0uMjY1eiIgb3BhY2l0eT0iMSIgZGF0YS1vcmlnaW5hbD0iIzNkOWNlMiIgY2xhc3M9IiI+PC9wYXRoPjwvZz48L3N2Zz4="
                    style={{ height: "32px", width: "32px" }}
                    width="25px"
                    height="25px"
                  />
                  <InputLabel>Sample Quiz - Mountain</InputLabel>
                </Stack>
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  padding: "10px 12px",
                  display: "table-cell",
                  fontSize: "15px",
                  color: "rgb(50, 53, 55)",
                  " @media(max-width:991px)": { fontSize: "14px" },
                  " @media(max-width:479px)": { fontSize: "13px" },
                }}
              >
                <Typography variant="subtitle1">Course</Typography>
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  padding: "10px 12px",
                  display: "table-cell",
                  fontSize: "15px",
                  color: "rgb(50, 53, 55)",
                  " @media(max-width:991px)": { fontSize: "14px" },
                  " @media(max-width:479px)": { fontSize: "13px" },
                }}
              >
                <Typography variant="subtitle1" sx={{ width: "fit-content" }}>
                  Sample Materials
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  padding: "10px 12px",
                  display: "table-cell",
                  fontSize: "15px",
                  textAlign: "center",
                  color: "rgb(50, 53, 55)",
                  " @media(max-width:991px)": { fontSize: "14px" },
                  " @media(max-width:479px)": { fontSize: "13px" },
                }}
              >
                <Typography variant="subtitle1" sx={{ width: "fit-content" }}>
                  You
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  display: "table-cell",
                  padding: "10px 12px",
                  fontSize: "15px",
                  color: "rgb(50, 53, 55)",
                  " @media(max-width:991px)": { fontSize: "14px" },
                  " @media(max-width:479px)": { fontSize: "13px" },
                }}
              >
                <Typography variant="subtitle1" sx={{ width: "fit-content" }}>
                  Oct 15, 2023, 6:28 PM
                </Typography>
              </TableCell>
              <TableCell sx={{ display: "table-cell", minWidth: "28px" }}>
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4PSIwIiB5PSIwIiB2aWV3Qm94PSIwIDAgNDI2LjY2NyA0MjYuNjY3IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIiBjbGFzcz0iIj48Zz48Y2lyY2xlIGN4PSI0Mi42NjciIGN5PSIyMTMuMzMzIiByPSI0Mi42NjciIGZpbGw9IiM3Njc5NzkiIG9wYWNpdHk9IjEiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjIxMy4zMzMiIGN5PSIyMTMuMzMzIiByPSI0Mi42NjciIGZpbGw9IiM3Njc5NzkiIG9wYWNpdHk9IjEiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjM4NCIgY3k9IjIxMy4zMzMiIHI9IjQyLjY2NyIgZmlsbD0iIzc2Nzk3OSIgb3BhY2l0eT0iMSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCI+PC9jaXJjbGU+PC9nPjwvc3ZnPg=="
                  style={{ margin: "auto", width: "20px", height: "20px" }}
                  width="20px"
                  height="20px"
                />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                width: "100%",
                cursor: "pointer",
                display: "table-row",
                border: "none",
                borderBottom: "1px solid rgb(230,230,231)",
              }}
            >
              <TableCell
                sx={{
                  display: "table-cell",
                  padding: "8px 12px",
                  " @media(max-width:991px)": { fontSize: "14px" },
                  " @media(max-width:479px)": { fontSize: "13px" },
                }}
              >
                <Stack
                  sx={{
                    fontFamily: "Inter",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    alignItems: "center",
                    color: "rgb(101, 101, 102)",
                    fontSize: "15px",
                  }}
                  spacing="10px"
                  direction="row"
                >
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4PSIwIiB5PSIwIiB2aWV3Qm94PSIwIDAgOTYgOTYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxwYXRoIGZpbGw9IiNmOTMyMzIiIGQ9Ik04MS44MjQgMzIuNjU1aC0xOS42M2E1LjUyMiA1LjUyMiAwIDAgMS01LjUyMi01LjUyMlY1LjkzMXoiIG9wYWNpdHk9IjEiIGRhdGEtb3JpZ2luYWw9IiNiZGRiZmYiIGNsYXNzPSIiPjwvcGF0aD48ZyBmaWxsPSIjMzI4M2Y5Ij48cGF0aCBkPSJNODEuODI0IDM0LjU4OGgtMTkuNjNjLTQuMTExIDAtNy40NTUtMy4zNDQtNy40NTUtNy40NTNWNS45MzFhMS45MyAxLjkzIDAgMCAxIDEuMjItMS43OTYgMS45NTMgMS45NTMgMCAwIDEgMi4xMi40NjlsMjUuMTUyIDI2LjcyN2ExLjkzMyAxLjkzMyAwIDAgMS0xLjQwNyAzLjI1N3pNNTguNjA1IDEwLjgwNnYxNi4zMjlhMy41OTYgMy41OTYgMCAwIDAgMy41OSAzLjU5MmgxNS4xNTd6IiBmaWxsPSIjZjkzMjMyIiBvcGFjaXR5PSIxIiBkYXRhLW9yaWdpbmFsPSIjMzI4M2Y5IiBjbGFzcz0iIj48L3BhdGg+PHBhdGggZD0iTTczLjU0MSA5MkgyMi40NTljLTUuNjMzIDAtMTAuMjE2LTQuNTc4LTEwLjIxNi0xMC4yMTRWMTQuMjE0QzEyLjI0MyA4LjU3OSAxNi44MjUgNCAyMi40NTkgNGgzNC4yMTNjLjUzMyAwIDEuMDQyLjIxNiAxLjQwOC42MDRsMjUuMTUyIDI2LjcyN2MuMzM3LjM2MS41MjUuODM2LjUyNSAxLjMyN3Y0OS4xMjlDODMuNzU3IDg3LjQyMiA3OS4xNzQgOTIgNzMuNTQxIDkyek0yMi40NTkgNy44NjFjLTMuNTAyIDAtNi4zNTEgMi44NTMtNi4zNTEgNi4zNTN2NjcuNTcyYzAgMy41IDIuODQ5IDYuMzUzIDYuMzUxIDYuMzUzaDUxLjA4MmMzLjUwMiAwIDYuMzUxLTIuODUzIDYuMzUxLTYuMzUzVjMzLjQyM0w1NS44MzcgNy44NjF6IiBmaWxsPSIjZjkzMjMyIiBvcGFjaXR5PSIxIiBkYXRhLW9yaWdpbmFsPSIjMzI4M2Y5IiBjbGFzcz0iIj48L3BhdGg+PHBhdGggZD0iTTMxLjEyNSA2NS4xMTF2NS41OTJIMjcuMTVWNTQuMjE4aDYuNTc5YzEuMjYyIDAgMi4zNzguMjI2IDMuMzQ5LjY5czEuNzIgMS4xMjcgMi4yNTQgMS45ODVjLjUyOC44NTcuNzk4IDEuODI4Ljc5OCAyLjkxOCAwIDEuNjA3LS41NzcgMi44OTYtMS43MzEgMy44NTYtMS4xNDkuOTYtMi43MjkgMS40NDUtNC43NCAxLjQ0NWgtMi41MzR6bTAtMy4wNzNoMi42MDVjLjc3MSAwIDEuMzU5LS4xODkgMS43NjMtLjU3Mi40MDQtLjM4OC42MDQtLjkzMy42MDQtMS42MzQgMC0uNzcxLS4yMS0xLjM4Ni0uNjI2LTEuODUtLjQxNS0uNDUzLS45ODEtLjY5LTEuNjk5LS43MDFoLTIuNjQ4djQuNzU3ek00Ni4yMiA2NS4xMTF2NS41OTJoLTMuOTc1VjU0LjIxOGg2LjU3OWMxLjI2MiAwIDIuMzc4LjIyNiAzLjM0OS42OXMxLjcyIDEuMTI3IDIuMjU0IDEuOTg1Yy41MjguODU3Ljc5OCAxLjgyOC43OTggMi45MTggMCAxLjYwNy0uNTc3IDIuODk2LTEuNzMxIDMuODU2LTEuMTQ5Ljk2LTIuNzI5IDEuNDQ1LTQuNzQgMS40NDVINDYuMjJ6bTAtMy4wNzNoMi42MDVjLjc3MSAwIDEuMzU5LS4xODkgMS43NjMtLjU3Mi40MDQtLjM4OC42MDQtLjkzMy42MDQtMS42MzQgMC0uNzcxLS4yMS0xLjM4Ni0uNjI2LTEuODUtLjQxNS0uNDUzLS45ODEtLjY5LTEuNjk5LS43MDFINDYuMjJ6TTcwLjI4OCA1Ny4yODFoLTQuOTQ1djEzLjQyM2gtMy45OFY1Ny4yODFoLTQuODU0di0zLjA2M2gxMy43Nzl6IiBmaWxsPSIjZjkzMjMyIiBvcGFjaXR5PSIxIiBkYXRhLW9yaWdpbmFsPSIjMzI4M2Y5IiBjbGFzcz0iIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4="
                    style={{ height: "32px", width: "32px" }}
                    width="25px"
                    height="25px"
                  />
                  <InputLabel>How PureCode wil benefit you</InputLabel>
                </Stack>
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  padding: "10px 12px",
                  display: "table-cell",
                  fontSize: "15px",
                  color: "rgb(50, 53, 55)",
                  " @media(max-width:991px)": { fontSize: "14px" },
                  " @media(max-width:479px)": { fontSize: "13px" },
                }}
              >
                <Typography variant="subtitle1">Presentation</Typography>
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  padding: "10px 12px",
                  display: "table-cell",
                  fontSize: "15px",
                  color: "rgb(50, 53, 55)",
                  " @media(max-width:991px)": { fontSize: "14px" },
                  " @media(max-width:479px)": { fontSize: "13px" },
                }}
              >
                <Typography variant="subtitle1" sx={{ width: "fit-content" }}>
                  Sample Materials
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  padding: "10px 12px",
                  display: "table-cell",
                  fontSize: "15px",
                  textAlign: "center",
                  color: "rgb(50, 53, 55)",
                  " @media(max-width:991px)": { fontSize: "14px" },
                  " @media(max-width:479px)": { fontSize: "13px" },
                }}
              >
                <Typography variant="subtitle1" sx={{ width: "fit-content" }}>
                  You
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  display: "table-cell",
                  padding: "10px 12px",
                  fontSize: "15px",
                  color: "rgb(50, 53, 55)",
                  " @media(max-width:991px)": { fontSize: "14px" },
                  " @media(max-width:479px)": { fontSize: "13px" },
                }}
              >
                <Typography variant="subtitle1" sx={{ width: "fit-content" }}>
                  Oct 26, 2023, 1:48 PM
                </Typography>
              </TableCell>
              <TableCell sx={{ display: "table-cell", minWidth: "28px" }}>
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4PSIwIiB5PSIwIiB2aWV3Qm94PSIwIDAgNDI2LjY2NyA0MjYuNjY3IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIiBjbGFzcz0iIj48Zz48Y2lyY2xlIGN4PSI0Mi42NjciIGN5PSIyMTMuMzMzIiByPSI0Mi42NjciIGZpbGw9IiM3Njc5NzkiIG9wYWNpdHk9IjEiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjIxMy4zMzMiIGN5PSIyMTMuMzMzIiByPSI0Mi42NjciIGZpbGw9IiM3Njc5NzkiIG9wYWNpdHk9IjEiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjM4NCIgY3k9IjIxMy4zMzMiIHI9IjQyLjY2NyIgZmlsbD0iIzc2Nzk3OSIgb3BhY2l0eT0iMSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCI+PC9jaXJjbGU+PC9nPjwvc3ZnPg=="
                  style={{ margin: "auto", width: "20px", height: "20px" }}
                  width="20px"
                  height="20px"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
    </Box>
  );
}
