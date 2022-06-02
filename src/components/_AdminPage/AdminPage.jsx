import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RosterMember from '../_RosterMember/RosterMember';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './AdminPage.css';
import TextField from '@mui/material/TextField';
import { Box, Button, ListItem } from '@mui/material'
import { render } from 'react-dom';

function AdminPage() {
    const user = useSelector(store => store.user);
    const roster = useSelector(store => store.rosterReducer);
    const dispatch = useDispatch();
    const [searchUser, setSearchUser] = useState();

    const handleChange = (event) => {

        const user = {
            userName: event.target.value.toLowerCase()
        }
        if (user.userName.length < 1) {
            dispatch({
                type: 'GET_ROSTER'
            })
        } else {
            dispatch({
                type: 'SEARCH_FOR_USER',
                payload: user
            })
            console.log(user);
        }
    }

    const handleReset = () => {
        window.location.reload(false);

    }
    // useEffect gets all of the users and puts them in the rosterReducer
    useEffect(() => {
        dispatch({
            type: 'GET_ROSTER'
        })
    }, [])

    return (
        <div>
            <h2>Manage Users</h2>
            <Box
            sx={{mt: 2, display: 'flex', justifyContent: 'space-around'}}
            >
                <Box>
                    <TextField
                        label="Username"
                        helperText="SEARCH FOR A USER"
                        variant="filled"
                        value={searchUser}
                        onChange={(event) => handleChange(event)}
                        sx={{width: 300}}
                    />
                    <Button
                        // click of reset search button re-renders page and clears input
                        onClick={handleReset}
                        variant="contained"
                        color='primary'
                        sx={{
                            margin: '2px',
                            ml: 2,
                            mt: 2
                        }}
                    >Reset Search</Button>
                </Box>
            </Box>
            {/* table to display all of the users */}

            <Table sx={{ width: 750, margin: 'auto', boxShadow: 5, mt: 5, mb: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
                <TableHead sx={{ backgroundColor: '#cfd8dc', borderBottom: 3, borderRadius: 5 }}>
                    <TableRow>
                        <TableCell sx={{ borderTopLeftRadius: 5 }} align={'center'}>Username</TableCell>
                        <TableCell align={'center'}>Promote/Demote</TableCell>
                        <TableCell sx={{ borderTopRightRadius: 5 }} align={'center'}>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="tableBody" sx={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
                    {/* map through the users using RosterMember component, passing down each member */}
                    {roster.map(member => {
                        return (
                            <RosterMember
                                key={member.id}
                                member={member}
                            />
                        )
                    })}
                </TableBody>
            </Table>

        </div>
    );
}

export default AdminPage;