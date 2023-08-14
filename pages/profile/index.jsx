import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
`
const ProfileContent = styled.div`
  background: white ;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 15px;
`

const Profile = () => {
    return(
        <Container>
            <ProfileContent>
hello
            </ProfileContent>
            hello
        </Container>
    )
}
export default Profile