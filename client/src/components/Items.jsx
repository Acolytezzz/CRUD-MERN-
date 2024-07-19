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
import { useEffect, useState } from "react";
import axios from "axios";

function Items() {
  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);

  const [edit, setEdit] = useState({ item: "", calories: 0 });

  useEffect(() => {
    axios
      .get("https://crud-app-backend-nxfr.onrender.com/getItems")
      .then((res) => setData(res.data));
  }, []);

  const handleOpen = (id) => {
    const itemToEdit = data.find((item) => item._id === id);
    setEdit(itemToEdit || { item: "", calories: 0 });
    setOpen(true);
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
    const newItem = {
      item: edit.item,
      calories: edit.calories,
    };
    axios.post("https://crud-app-backend-nxfr.onrender.com/createItem", newItem).then((res) => {
      setData((prevdata) => [...prevdata, res.data]);
      handleCloseAdd();
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://crud-app-backend-nxfr.onrender.com/deleteItem/${id}`)
      .then(() => setData(data.filter((item) => item._id !== id)));
  };

  // const handleEditItems = async () => {
  //   const updatedItem = {
  //     item: edit.item,
  //     calories: edit.calories,
  //   };
  //   await axios
  //     .put(`https://crud-app-backend-nxfr.onrender.com/updateItem/${edit._id}`, updatedItem)
  //     .then((res) => {
  //       setData((prevData) =>
  //         prevData.map((item) =>
  //           item._id === edit._id ? { ...item, ...updatedItem } : item
  //         )
  //       );
  //       handleClose();
  //     })
  //     .catch((err) => console.log(err));
  // };

  const handleEditItems = async () => {
    const updatedItem = {
      item: edit.item,
      calories: edit.calories,
    };
    await axios
      .put(`https://crud-app-backend-nxfr.onrender.com/updateItem/${edit._id}`, updatedItem)
      .then((res) => {
        setData((prevdata) =>
          prevdata.map((item) =>
            item._id === edit._id ? { ...item, ...updatedItem } : item
          )
        );
        handleClose();
      })
      .catch((err) => console.log(err));
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
                <TableCell>Items (100g serving)</TableCell>
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
                    {data.item}
                  </TableCell>
                  <TableCell align="right">{data.calories} g</TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => handleOpen(data._id)}
                      variant="contained"
                      color="success"
                    >
                      Edit
                    </Button>{" "}
                    &nbsp;&nbsp;{" "}
                    <Button
                      onClick={() => handleDelete(data._id)}
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
              value={edit.item}
              onChange={(e) => setEdit({ ...edit, item: e.target.value })}
              sx={{ width: "100%" }}
            />
            <br />
            <br />
            <TextField
              label="Add Calories"
              value={edit.calories}
              onChange={(e) =>
                setEdit({ ...edit, calories: parseInt(e.target.value)})
              }
              type="number"
              variant="outlined"
              sx={{ width: "100%" }}
            />
            <br />
            <br />
            <Button variant="contained" onClick={handleEditItems}>
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
              onChange={(e) => setEdit({ ...edit, item: e.target.value })}
              sx={{ width: "100%" }}
            />
            <br />
            <br />
            <TextField
              label="Add Calories"
              onChange={(e) =>
                setEdit({ ...edit, calories: parseInt(e.target.value)})
              }
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

export default Items;
