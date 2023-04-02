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
      <Table sx={{ minWidth: 650 }} aria-label="customized  table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: '800' }}>From Address</TableCell>
            <TableCell style={{ fontWeight: '800' }}>To Address</TableCell>
            <TableCell style={{ fontWeight: '800' }}>Vehicle</TableCell>
            <TableCell style={{ fontWeight: '800' }}>Item</TableCell>
            <TableCell style={{ fontWeight: '800' }}>Order Date</TableCell>
            <TableCell style={{ fontWeight: '800' }}>Order Status</TableCell>
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
              <TableCell>{row.to}</TableCell>
              <TableCell>{row.vehicle}</TableCell>
              <TableCell>{row.items}</TableCell>
              <TableCell>{row.orderDate}</TableCell>
              <TableCell>{row.orderStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
