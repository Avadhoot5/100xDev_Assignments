import React from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

const Appbar = () => {
    const navigate = useNavigate();

  return (
    <Navigation>
        <Typography>Course page</Typography>
        <TwoButton>
            <Button variant="contained" onClick={() => {
                navigate('/signup');
            }}>Signup</Button>
            <Button variant="contained" onClick={() => {
                navigate('/signin');
            }}>Signin</Button>
        </TwoButton>
    </Navigation>
  )
}

export default Appbar;

const Navigation = styled.nav`
    display: flex;
    justify-content: space-between;
    padding: 5px;
`

const TwoButton = styled.div`
    display: flex;
    gap: 5px;

`