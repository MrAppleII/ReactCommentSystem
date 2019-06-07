import React, { Component } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
/*
    These can be any generic button with a provided image and logo text. It also 
    accepts a handler. 

*/
class SocialActionButton extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {}
  componentWillUnmount() {}

  render() {
    try {
      return (
        <Container onClick={this.props.ButtonClick}>
          <InnerCol>
            <IconImage
              src={this.props.iconSrc}
              width={24}
              height={24}
              alt={this.props.ButtonText}
            />
            <ButtonText>{this.props.ButtonText}</ButtonText>
          </InnerCol>
        </Container>
      )
    } catch (e) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log(e)
      }
      return null
    }
  }
}

SocialActionButton.propTypes = {
  ButtonText: PropTypes.string,
  iconSrc: PropTypes.node.isRequired,
  ButtonClick: PropTypes.func,
}
SocialActionButton.defaultProps = {
  ButtonClick: function() {},
}
const ButtonText = styled.div`
  margin-left: 0.2rem;
  margin-top: auto;
  margin-bottom: auto;
  /* Fonts */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;

  /* Button Behavioir */

  text-rendering: auto;
  :hover {
    text-decoration: underline;
    color: ${props => props.highlightColor || "rgb(99, 159, 255)"};
  }
`
const IconImage = styled.img`
  margin-top: auto;
  margin-bottom: auto;
`
const Container = styled.div`
  align-items: center;
  display: flex;
  cursor: pointer;
  vertical-align: baseline;
  flex-direction: row;

  padding-left: 10px;
  padding-right: 10px;

  flex-wrap: wrap;
`
const InnerCol = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`
export default SocialActionButton
