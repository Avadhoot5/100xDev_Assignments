import React from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button';

const Appbar = () => {
  return (
    <Navigation>
        <h6>Course page</h6>
        <div>
            <Button variant="contained">Contained</Button>
        </div>
    </Navigation>
  )
}

export default Appbar;

const Navigation = styled.nav`


`