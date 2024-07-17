import {
  Box,
  Container,
  TableBody,
  TableRow,
  Typography,
  Table as Tabled,
  TableContainer,
  TableHead,
  TableCell,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { useState } from "react";

function Table() {
  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);

  const [addItem, setAddItem] = useState("");

  const [addCalories, setAddCalories] = useState(0);

  const [edit, setEdit] = useState();

  const handleOpen = (n) => {
    const item = data.find((e) => e.name === n);
    setAddItem(item.name);
    setAddCalories(item.calories);
    setOpen(true);
    setEdit(n);
  };

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleAddItems = () => {
    setData((d) => [
      ...d,
      {
        name: addItem,
        calories: addCalories,
      },
    ]);
    handleCloseAdd();
  };

  const handleDelete = (n) => {
    setData((d) => d.filter((e) => e.name !== n));
  };

  const handleEditItems = (m, n) => {
    setData((d) =>
      d.map((item) => (item.name === edit ? { name: m, calories: n } : item))
    );
    handleClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
      }}
    >
      <Container>
        <Typography variant="h3" fontWeight="Bold">
          CRUD Application
        </Typography>
        <Button
          onClick={handleOpenAdd}
          variant="contained"
          sx={{ float: "right", mr: "5%" }}
        >
          Add Items
        </Button>
        <TableContainer component="Paper">
          <Tabled sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories (g)</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((data) => (
                <TableRow
                  key={Math.random()}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {data.name}
                  </TableCell>
                  <TableCell align="right">{data.calories}</TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => handleOpen(data.name)}
                      variant="contained"
                      color="success"
                    >
                      Edit
                    </Button>{" "}
                    &nbsp;&nbsp;{" "}
                    <Button
                      onClick={() => handleDelete(data.name)}
                      variant="contained"
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Tabled>
        </TableContainer>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ height: "100vh" }}
      >
        <Box
          backgroundColor="white"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "40%",
            width: "40%",
            margin: "0 auto",
            mt: "20%",
          }}
        >
          <Container alignItems="vertically">
            <TextField
              label="Add Items Here..."
              value={addItem}
              onChange={(e) => setAddItem(e.target.value)}
              sx={{ width: "100%" }}
            />
            <br />
            <br />
            <TextField
              label="Add Calories"
              value={addCalories}
              onChange={(e) => setAddCalories(e.target.value)}
              type="number"
              variant="outlined"
              sx={{ width: "100%" }}
            />
            <br />
            <br />
            <Button
              variant="contained"
              onClick={() => handleEditItems(addItem, addCalories)}
            >
              Submit
            </Button>
          </Container>
        </Box>
      </Modal>

      <Modal open={openAdd} onClose={handleCloseAdd} sx={{ height: "100vh" }}>
        <Box
          backgroundColor="white"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "40%",
            width: "40%",
            margin: "0 auto",
            mt: "20%",
          }}
        >
          <Container alignItems="vertically">
            <TextField
              label="Add Items Here..."
              onChange={(e) => setAddItem(e.target.value)}
              sx={{ width: "100%" }}
            />
            <br />
            <br />
            <TextField
              label="Add Calories"
              onChange={(e) => setAddCalories(e.target.value)}
              type="number"
              variant="outlined"
              sx={{ width: "100%" }}
            />
            <br />
            <br />
            <Button variant="contained" onClick={handleAddItems}>
              Submit
            </Button>
          </Container>
        </Box>
      </Modal>
    </Box>
  );
}

export default Table;
