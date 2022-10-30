import * as React from 'react';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthProvider';

const EditComponent = () => {
    const [type, setType] = React.useState("");
    const [component, setComponent] = React.useState({});
    const [active, setActive] = React.useState("");
    const { id } = useParams();
    const { userInfo } = React.useContext(AuthContext);
    console.log(type, component);

    React.useEffect(() => {
        axios.get(`http://localhost:5000/components/viewcomponent/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res) => {
                setType(res?.data?.type);
                setComponent(res?.data);
                setActive(res?.data?.active);
            });
    }, [id]);

    const handleActive = async (e, componentId, userId) => {
        if (e.target.value === "0") {
            const proceed = window.confirm("Are you sure to deactivated?");
            if (proceed) {
                await axios.put("http://localhost:5000/components/activate-deactivate", { componentId, userId, activateDeactivate: e.target.value }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                })
                    .then(() => {
                        setActive(e.target.value);
                    });
            }
        } else {
            const proceed = window.confirm("Are you sure to activated?");
            if (proceed) {
                await axios.put("http://localhost:5000/components/activate-deactivate", { componentId, userId, activateDeactivate: e.target.value }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                })
                    .then(() => {
                        setActive(e.target.value);
                    });
            }
        }
    };

    return (
        <Box >
            <Typography sx={{ mt: 5, mb: 2 }} variant="h6" gutterBottom>
                PLEASE EDIT COMPONENT INFORMATION
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                <Box sx={{ textAlign: 'start', width: '60%' }}>
                    <FormControl >
                        <FormLabel style={{ color: '#002884' }} >THIS COMPONENT IS </FormLabel>
                        <RadioGroup
                            row
                            name="active"
                            value={active}
                            onChange={e => handleActive(e, component?.id, userInfo?.id)}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Activate" />
                            <FormControlLabel value="0" control={<Radio />} label="Deactivate" />
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    );
};

export default EditComponent;