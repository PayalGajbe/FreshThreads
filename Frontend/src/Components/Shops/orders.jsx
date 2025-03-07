import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  TextField,
  Button,
  Container,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const servicePrices = {
  'Wash & Fold': {
    Cotton: 10,
    Woolen: 15,
    Bedsheets: 20,
    Curtains: 25,
  },
  'Dry Cleaning': {
    Cotton: 20,
    Woolen: 25,
    Bedsheets: 30,
    Curtains: 35,
  },
  Ironing: {
    Cotton: 5,
    Woolen: 8,
    Bedsheets: 12,
    Curtains: 15,
  },
};

const Orders = () => {
  const [rows, setRows] = useState([{ service: '', item: '', quantity: '', price: 0 }]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    if (field === 'quantity' && value <= 0) {
      return;
    }
    updatedRows[index][field] = value;

    if (field === 'service' || field === 'item' || field === 'quantity') {
      const { service, item, quantity } = updatedRows[index];
      const price =
        service && item && quantity ? (servicePrices[service]?.[item] || 0) * parseInt(quantity, 10) : 0;
      updatedRows[index].price = price;
    }

    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([...rows, { service: '', item: '', quantity: '', price: 0 }]);
  };

  const deleteRow = (index) => {
    if (rows.length > 1) {
      const updatedRows = rows.filter((_, i) => i !== index);
      setRows(updatedRows);
    }
  };

  const calculateTotalPrice = () => {
    return rows.reduce((total, row) => total + row.price, 0);
  };

  const handleProceedToPayment = () => {
    const totalAmount = calculateTotalPrice();
    if (totalAmount === 0) {
      setSnackbarMessage("Please add atleast 1 item to proceed.");
      setOpenSnackbar(true);
      return;
    }
  
    const options = {
      key: "rzp_test_3kP46XTyMD12fe", 
      amount: totalAmount * 100, // Razorpay works with paise (1 INR = 100 paise)
      currency: "INR",
      name: "FreshThreads",
      description: "Payment for laundry services",
      
      handler: function (response) {
        //alert(Payment successful! Payment ID: ${response.razorpay_payment_id});
        console.log(response);
        setOpenDialog(true);
      },
      // prefill: {
      //   name: "Customer Name",
      //   email: "customer@example.com",
      //   contact: "9999999999",
      // },
      theme: {
        color: "#3399cc",
      },
    };
  
    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setRows([{ service: '', item: '', quantity: '', price: 0 }]); // Reset fields
    
  };
  

  return (
    <Container sx={{ fontFamily: 'Poppins, sans-serif', mt: 4, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', fontFamily: 'Poppins' }}>
        Add items to your Laundry Bag
      </Typography>

      <Table sx={{ mt: 4 }}>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <Select
                  value={row.service}
                  onChange={(e) => handleRowChange(index, 'service', e.target.value)}
                  displayEmpty
                  sx={{ fontFamily: 'Poppins, sans-serif', width: 180 }}
                >
                  <MenuItem value="" disabled>
                    Choose Service
                  </MenuItem>
                  <MenuItem value="Wash & Fold">Wash & Fold</MenuItem>
                  <MenuItem value="Dry Cleaning">Dry Cleaning</MenuItem>
                  <MenuItem value="Ironing">Ironing</MenuItem>
                </Select>
              </TableCell>

              <TableCell>
                <Select
                  value={row.item}
                  onChange={(e) => handleRowChange(index, 'item', e.target.value)}
                  displayEmpty
                  sx={{ fontFamily: 'Poppins, sans-serif', width: 150 }}
                >
                  <MenuItem value="" disabled>
                    Add Items
                  </MenuItem>
                  <MenuItem value="Cotton">Cotton</MenuItem>
                  <MenuItem value="Woolen">Woolen</MenuItem>
                  <MenuItem value="Bedsheets">Bedsheets</MenuItem>
                  <MenuItem value="Curtains">Curtains</MenuItem>
                </Select>
              </TableCell>

              <TableCell>
                <TextField
                  type="number"
                  inputProps={{ min: 1 }}
                  value={row.quantity}
                  onChange={(e) => handleRowChange(index, 'quantity', e.target.value)}
                  placeholder="Quantity"
                  sx={{ fontFamily: 'Poppins, sans-serif', width: 120 }}
                />
              </TableCell>

              <TableCell>
                <TextField
                  value={row.price ? `Rs. ${row.price}` : ''}
                  InputProps={{ readOnly: true }}
                  placeholder="Calculated Price"
                  sx={{ fontFamily: 'Poppins, sans-serif', width: 150 }}
                />
              </TableCell>

              <TableCell>
                {rows.length > 1 && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteRow(index)}
                    sx={{ fontFamily: 'Poppins, sans-serif', textTransform: 'none', fontSize: '14px' }}
                  >
                    Delete
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Button
          variant="contained"
          onClick={addRow}
          sx={{ fontFamily: 'Poppins, sans-serif', textTransform: 'none', mr: 2 }}
        >
          Add more items
        </Button>

        <TextField
          value={`Rs. ${calculateTotalPrice()}`}
          InputProps={{ readOnly: true }}
          label="Total Price"
          sx={{ fontFamily: 'Poppins, sans-serif', minWidth: 150 }}
        />
      </Box>
      {/* Payment Success Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Payment Successful</DialogTitle>
        <DialogContent>
          <Typography>Your payment was successful! Thank you for using FreshThreads.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} variant="contained" color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="contained"
        color="success"
        onClick={handleProceedToPayment}
        sx={{
          fontFamily: 'Poppins, sans-serif',
          textTransform: 'none',
          mt: 4,
          mb: 5,
          px: 4,
          py: 1.5,
          fontSize: '18px',
        }}
      >
        Proceed to Payment
      </Button>

      {/* Snackbar for validation message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Orders;