import React from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import styled from "styled-components";
import color from 'utils/style/color';

function FavoritSection() {
  return (
    <FavoritSectionsContainer>
      <header>
        <BsHeartFill/>
        <span>Favorites</span>
      </header>
      <ul className="rooms">
        {/* {userList.map( userInfo => <DirectMessageSectionItem key={userInfo.uid} userInfo={userInfo}/> )} */}
      </ul>
    </FavoritSectionsContainer>
  );
}

const FavoritSectionsContainer = styled.section`
header{
  display:flex;
  align-items:center;
  text-transform:uppercase; 
  padding-top:1rem;
  font-weight:bold;
  span{
    padding-top:0.3rem;
    display:flex;
    align-items:center;
    margin-left:5px;
  }
}
.rooms{
  font-size:1.1rem;
  padding-left:10px;
  li{
    display:flex;
    align-items:center;
    justify-content:space-between;
    border-radius:5px;
    padding:5px;
    cursor: pointer;

    .dm-left{
      display:flex;
      align-items:center;
      position:relative;
      img{
        margin-right:5px;
        width:20px;
        height:20px;
      }
    }
    &:hover{
      opacity:0.8;
    }
  }
  li.active{
    font-weight:bold;
    background-color:${color.yellow};
    color:${color.brown};
  } 
}
`;



export default FavoritSection;
