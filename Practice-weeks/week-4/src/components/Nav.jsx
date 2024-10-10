import styled from 'styled-components';

function Nav() {

  const currentDate = new Date().toDateString();

  return (
    <>
      <Heading>
          Todo List
      </Heading>
      <Day>
        <h2>Today</h2>
        <p>{currentDate}</p>
      </Day>
    </>
  )
}


const Heading = styled.div`
    margin: 0 auto;
    height: 100px;
    align-items: center;
    background-color: #01cbcb;
    display: flex;
    justify-content: center;
    font-size: 30px;
    font-weight: 600;
`

const Day = styled.div`
  background-color: black;
  color: white;
  height: 100px;
  padding-top: 40px;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export default Nav;