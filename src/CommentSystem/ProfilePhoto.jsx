import React, { Component } from "react";
import styled from "styled-components"

class ProfilePhoto extends Component {
  render() {
    return (
        <Container>
        <img
          style={{ borderRadius: " 50%", 

        }}
          src={this.props.imageSrc}
          width={this.props.size}
          height={this.props.size}
          alt="Oops."
        />
        </Container>
    );
  }
}

const Container = styled.div`
width:${props => props.size|| 20};
height:${props => props.size|| 20};
flex-shrink:0;
align-self:center;

`


export default ProfilePhoto;
