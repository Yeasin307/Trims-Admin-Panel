import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Textarea from '@mui/joy/Textarea';
import { Box } from '@mui/material';

const AddCategory = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreateCategory = e => {
        e.preventDefault();
    };

    return (
        <Box style={{ marginTop: '-36px' }}>
            <Box style={{ display: 'flex', justifyContent: 'end' }} >
                <Button variant="outlined" onClick={handleClickOpen}>ADD NEW CATEGORY</Button>
            </Box>

            <Dialog maxWidth="sm" fullWidth={true} open={open} onClose={handleClose}>
                <DialogTitle>PLEASE CREATE A NEW CATEGORY</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleCreateCategory}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Enter Category Name"
                            fullWidth
                            required
                            variant="standard"
                            style={{ fontsize: '18px', color: 'black' }}
                        />
                        <Textarea
                            sx={{ mt: 2.5 }}
                            placeholder="Enter Description"
                            minRows={4}
                        />
                        <Button sx={{ mt: 2.5 }} type="submit" variant="contained">Submit</Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AddCategory;