import * as React from 'react';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';
import AboutUsEdit from '../../components/component/edit-component/AboutUsEdit';
import CEOMessageEdit from '../../components/component/edit-component/CEOMessageEdit';
import ClientEdit from '../../components/component/edit-component/ClientEdit';
import GalleryEdit from '../../components/component/edit-component/GalleryEdit';
import HomeSliderManagementEdit from '../../components/component/edit-component/HomeSliderManagementEdit';
import ProfileEdit from '../../components/component/edit-component/ProfileEdit';
import VisionMissionGoalEdit from '../../components/component/edit-component/VisionMissionGoalEdit';

const EditComponent = () => {
    const [type, setType] = React.useState("");
    const [component, setComponent] = React.useState({});
    const [active, setActive] = React.useState("");
    const { id } = useParams();
    const { userInfo } = React.useContext(AuthContext);

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_API}/components/viewcomponent/${id}`, {
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
                await axios.put(`${process.env.REACT_APP_SERVER_API}/components/activate-deactivate`, { componentId, userId, activateDeactivate: e.target.value }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                })
                    .then(() => {
                        setActive(e.target.value);
                    });
            }
        } else {
            const proceed = window.confirm("Are you sure to activated?");
            if (proceed) {
                await axios.put(`${process.env.REACT_APP_SERVER_API}/components/activate-deactivate`, { componentId, userId, activateDeactivate: e.target.value }, {
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

            {active === "1" &&
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }} >
                        <TextField
                            disabled
                            label="Component Type"
                            value={type}
                            variant="standard"
                            sx={{ textAlign: 'start', width: '60%', borderBottomStyle: 'solid' }}
                        />
                    </Box>

                    {type === "ABOUT_US" &&
                        <AboutUsEdit
                            type={type}
                            component={component}
                        />
                    }

                    {(type === "VISION" || type === "MISSION" || type === "GOAL") &&
                        <VisionMissionGoalEdit
                            type={type}
                            component={component}
                        />
                    }

                    {(type === "HOME_SLIDER" || type === "MANAGEMENT") &&
                        <HomeSliderManagementEdit
                            type={type}
                            component={component}
                        />
                    }

                    {type === "GALLERY" &&
                        <GalleryEdit
                            type={type}
                            component={component}
                        />
                    }

                    {type === "CEO_MESSAGE" &&
                        <CEOMessageEdit
                            type={type}
                            component={component}
                        />
                    }

                    {type === "COMPANY_PROFILE" &&
                        <ProfileEdit
                            type={type}
                            component={component}
                        />
                    }

                    {type === "CLIENT" &&
                        <ClientEdit
                            type={type}
                            component={component}
                            setComponent={setComponent}
                            setType={setType}
                            setActive={setActive}
                        />
                    }

                </>
            }

        </Box>
    );
};

export default EditComponent;