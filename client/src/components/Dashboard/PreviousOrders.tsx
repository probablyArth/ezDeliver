import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  from: string,
  to: string,
  vehicle: string,
  items: string,
  orderDate: string,
  orderStatus: string
) {
  return { from, to, vehicle, items, orderDate, orderStatus };
}

const rows = [
  createData(
    "Delhi",
    "Banglore",
    "Small",
    "Item 23",
    "12:23:AM, 01-04-2023",
    "Booked"
  ),
  createData(
    "Delhi",
    "Banglore",
    "Small",
    "Item 23",
    "12:23:AM, 01-04-2023",
    "Booked"
  ),
  createData(
    "Delhi",
    "Banglore",
    "Small",
    "Item 23",
    "12:23:AM, 01-04-2023",
    "Booked"
  ),
  createData(
    "Delhi",
    "Banglore",
    "Small",
    "Item 23",
    "12:23:AM, 01-04-2023",
    "Booked"
  ),
  createData(
    "Delhi",
    "Banglore",
    "Small",
    "Item 23",
    "12:23:AM, 01-04-2023",
    "Booked"
  ),
  createData(
    "Delhi",
    "Banglore",
    "Small",
    "Item 23",
    "12:23:AM, 01-04-2023",
    "Booked"
  ),
  createData(
    "Delhi",
    "Banglore",
    "Small",
    "Item 23",
    "12:23:AM, 01-04-2023",
    "Booked"
  ),
];

export default function PreviousOrders() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>From Address</TableCell>
            <TableCell align="right">To Address</TableCell>
            <TableCell align="right">Vehicle</TableCell>
            <TableCell align="right">Item</TableCell>
            <TableCell align="right">Order Date</TableCell>
            <TableCell align="right">Order Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.from}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.from}
              </TableCell>
              <TableCell align="right">{row.to}</TableCell>
              <TableCell align="right">{row.vehicle}</TableCell>
              <TableCell align="right">{row.items}</TableCell>
              <TableCell align="right">{row.orderDate}</TableCell>
              <TableCell align="right">{row.orderStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
