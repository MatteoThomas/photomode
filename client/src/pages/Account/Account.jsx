import React, { useEffect, useState } from "react";
import {Container, Button} from "react-bootstrap"
import styled from "styled-components";
// import AvatarsList from "./Avatars"
import AvatarUpload from "./AvatarUpload";

const Account = () => {
  const [avatar, setAvatar] = useState([]);
  console.log(avatar)
  const [showAvatarGallery, setShowAvatarGallery] = useState(false)
  const [bio, setBio] = useState("");
  const [tempBio, setTempBio] = useState("");
  const [showBioInput, setShowBioInput] = useState(false)
  const [buttonText, setButtonText] = useState("Edit Bio")
  const [userName, setUserName] = useState("")

  useEffect(() => {
    populateBio();
    fetchName();
  }, [userName]);
  
//GETS USER NAME FROM MONGODB
  const fetchName = async() => {
    const req = await fetch("http://localhost:8080/api/login", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await req.json();
    if (data.status === "ok") {
      //SETS userName
      setUserName(data.name);
      fetchAvatar();
    } else {
  alert(data.error);
  }}

  //FETCH USER AVATAR FROM CLOUDINARY
  const fetchAvatar = async() => {
    //SENDS userName AS A SEARCH PARAMETER
    const req = await fetch(`http://localhost:8080/api/avatar?folderData=${userName}`)
    const data = await req.json();
    (data.status === "ok" && data.results.total_count) ?
    setAvatar(data.results.resources[0].secure_url)
    :
    console.log("No avatar selected")
  }

  const populateBio = async() =>  {
    const req = await fetch("http://localhost:8080/api/bio", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await req.json();
    if (data.status === "ok") {
      setBio(data.bio);
    } else {
      alert(data.error);
    }
  }
  
  async function updateBio(event) {
    event.preventDefault();
    const req = await fetch("http://localhost:8080/api/bio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        bio: tempBio,
      }),
    });
    
    const data = await req.json();
    if (data.status === "ok") {
      setBio(tempBio);
      setTempBio("");
    } else {
      alert(data.error);
    }
  }
  
  const logOut = () => {
    localStorage.removeItem("token");
    console.log("it worked logout btn");
    window.location.href = "/login";
  };

  //CHECKS IF showBio STATE IS FALSE
  //FALSE SETS showBio TO TRUE AND buttonText STATE to "Update Bio"
  //TRUE SETS showBio TO FALSE AND buttonText STATE to "Edit Bio"
  function handleBioClick() {
    if (!showBioInput) {
      setShowBioInput(true);
      setButtonText("Update Bio");
    } else {
      setShowBioInput(false);
      setButtonText("Edit Bio");
    }
  }

//RENDERS BIO INPUT FIELD WHEN BUTTON CLICKED AND showBio STATE IS SET TO TRUE
//INITIAL STATE IS FALSE SO BIO INPUT FIELD IS HIDDEN
  const bioInput = showBioInput &&
    <Input
      maxLength="80"
      type="text"
      placeholder=" Bio"
      onChange={(e) => setTempBio(e.target.value)}
    /> 
    
  function handleAvatarClick() {
      if (!showAvatarGallery) {
      setShowAvatarGallery(true)
      } else {
      setShowAvatarGallery(false)
      }
    }
//VARIABLE THAT CHECK CONDITION OF showAvatarGallery THEN RENDERS AvatarUpload COMPONENT or DIV
  const userAvatar = avatar.length > 0  ? 
    <><AvatarImg src={avatar} alt="avatar" onClick={() => handleAvatarClick()} /><div>Click to change</div></> 
    : <div onClick={() => handleAvatarClick()}>No avatar selected, click here to add</div> 

  const avatarUpload = showAvatarGallery && <AvatarUpload/> 

  return (
    <StyledContainer>

      <StyledCol >
        <h1>{userName}</h1>
          <form onSubmit={updateBio}>
            {bioInput}
            <StyledButton 
              className="Btn" 
              type="submit" 
              onClick={() => handleBioClick()}>
                {buttonText}
            </StyledButton>  
            <Bio>{bio}</Bio>
          </form>
      </StyledCol>

      <StyledCol >
        <AvatarContainer>
          {userAvatar}
          {avatarUpload}
        </AvatarContainer>
      </StyledCol >

      <StyledCol >
        <StyledButton 
          className="Btn" 
          type="button" 
          onClick={logOut}>
            Logout
        </StyledButton>
      </StyledCol >

    </StyledContainer>
  );
};

export default Account;

const StyledContainer = styled.div`
  color: #fff8f0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const StyledButton = styled(Button)`
  background-color: aquamarine;
  color: black;
  border: 1px transparent solid;
  margin: 1rem 0 0 0;
  border: 1px transparent solid;
  &:hover {
    background-color: transparent;
    border: 1px aquamarine solid;
  }
`

const StyledCol = styled.div`
  border-radius: 10px;
  margin: 0.5rem auto;
  padding: 0.5rem;
  word-wrap: break-word;
  width: 300px;
`

const Bio = styled.div`
  padding: 1rem 0.5rem 1rem 0;
  font-size: 1rem;
  overflow-wrap: break-word;
`

const Input = styled.input`
  width: 100%;
`

const AvatarImg = styled.img`
  width: 100%;
`

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 0 auto;
`

