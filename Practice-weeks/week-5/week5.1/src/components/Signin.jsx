import styled from 'styled-components';
import { BASE_URL } from '../App';
import { useState } from 'react';

const Signin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignin = async () =>{ 
        try {
            const response = await fetch(`${BASE_URL}login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                alert(data.message);
            }
        }
        catch (error) {
                alert(error.message);
        }
    }

  return (<>

    <TopHeading>
        <h3>Welcome Back! Signin Below.</h3>
    </TopHeading>
    <MainCard>
        <EmailPass>
            <div>
                <input type='email' id='email' name='email' placeholder='Email'
                onChange={(e) => {
                    setEmail(e.target.value);
                }}/>
            </div>
            <div>
                <input type='password' id='password' name='password' placeholder='Password'
                onChange={(e) => {
                    setPassword(e.target.value);
                }}/>
            </div>
        </EmailPass>
        <Button onClick={handleSignin}>Signin</Button>
    </MainCard>

  </>)

}

export default Signin

const TopHeading = styled.div`
    display: flex;
    padding-top: 100px;
    justify-content: center;
`

const MainCard = styled.div`
    margin: 0 auto;
    padding: 10px;
    height: 40vh;
    width: 50vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid black;
    border-radius: 5px;

`

const EmailPass = styled.div`

    input {
        width: 40vw;
        padding: 5px 10px;
    }

    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 10px;
`

const Button = styled.button`
    all: unset;
    border: 1px solid black;
    border-radius: 4px;
    background-color: lightgreen;
    color: black;
    font-weight: 500px;
    font-size: 18px;
    width: 10vw;
    padding: 5px 10px;

    display: flex;
    justify-content: center;

    cursor: pointer;

`