import React, { Component } from "react"
import styled, { keyframes } from "styled-components"
import PropTypes from "prop-types"
/*
    File: ReplyBox.jsx
    Description: Creates a comment box that has automatically resizes depending on the content. 
    Props:
    lineHeight: PropTypes.number,   This is the line height expected. Default is 18.
    placeholder: PropTypes.string,  This is the placeholder text in the comment box
    onClickButton: PropTypes.func,  Function that is run when the Post button is pressed.
    maxRows: PropTypes.number,      Max amount of rows in the text box. 
     minRow: PropTypes.number,      Min amount of row in the text box. 
     onReplyClick: PropTypes.func,  This is the handler for the reply text. Here is what is NUTS. 
                                    The textBox value ALWAYS gets passed in as a parameter so watch out for that.
*/

class ReplyBox extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      lineHeight: 18,
      textBoxHeight: 18,
      minRows: 1,
      maxRows: 5,
      rows: 1,
      textBoxValue:"",
    }
  }
  componentDidMount() {
      this.setState({
            minRows:this.props.minRows,
            maxRows:this.props.maxRows,
            lineHeight:this.props.lineHeight,
      })
  }
  componentWillUnmount() {}

  watchSize = (event) => {

    //First lets also get the text from the box.
    this.setState({
       textBoxValue: event.target.value,
    })
    const textareaLineHeight = this.state.lineHeight
    const { minRows, maxRows } = this.state

    const previousRows = event.target.rows
    event.target.rows = minRows 
    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight)

    if (currentRows === previousRows) {
      event.target.rows = currentRows
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows
      event.target.scrollTop = event.target.scrollHeight
    }

    this.setState({
      value: event.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows,
    })
  }

 ReplyButtonHandler  = () =>{

  this.props.onReplyClick(this.state.textBoxValue)

 }

  render() {
    try {
      
      return this.props.isVisible? (
       
        <CommentContainer className="show">
          <InnerContainer>
            <CommentForm>
              <TextBox
                onChange={this.watchSize}
                rows={this.state.rows}
                placeholder={this.props.placeholder}
              />
              <PostButton  type='button' disabled={!this.state.textBoxValue}  onClick={this.ReplyButtonHandler}>Reply</PostButton>
            </CommentForm>
          </InnerContainer>
        </CommentContainer>
      ) : null
    } catch (e) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log(e)
      }
      return null
    }
  }
}
ReplyBox.propTypes = {
  lineHeight: PropTypes.number,
  placeholder: PropTypes.string,
  onClickButton: PropTypes.func,
 maxRows: PropTypes.number,
 minRow: PropTypes.number,
 isVisible: PropTypes.bool,
 onReplyClick: PropTypes.func,
}
ReplyBox.defaultProps = {
  lineHeight: 18,
  placeholder: "Add a Reply...",
  minRows: 1,
  maxRows: 5,
  isVisible: false,
  onReplyClick: function() {},
  
}
/***  CSS PROPERTIES  ***/
const DisplayDiv = keyframes`

from {
  transform-style: preserve-3d;
  
 

  opacity: 0;
  
}
to {
  transform-style: preserve-3d;
  
 

  visibility: visible;
  opacity: 0.99;
} 
`
const CommentContainer = styled.div`
  /* Colors */
  background-color: ${props => props.containerColor || "white"};
  color: #999;


  /* Borders */
  border-radius: ${props => props.borderRadius || "20"}px;

  /* Fonts */
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;

  /* Dimensions */
  min-height: 56px;
  line-height: 18px;

  /* Margins */
  margin-top: 4px;
  margin-bottom: 0px;
  margin-right: 0px;
  margin-left: 0px;

  /* Padding */
  padding-top: 0px;
  padding-right: 16px;
  padding-bottom: 0px;
  padding-left: 16px;

  /* Aignments */
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  vertical-align: baseline;
  justify-content: center;
  z-index:0;

  /* Position */
  position: relative;

  &.show {
  
    animation: ${DisplayDiv} 0.10s ease-in;
  }
`
const InnerContainer = styled.div`
  /* Margins */
  margin-top: 0px;
  margin-bottom: 0px;
  margin-right: 0px;
  margin-left: 0px;
  
  /* Padding */
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  z-index:0;

  /* Position */
  position: relative;
`

const CommentForm = styled.form`
  /* Margins */
  margin-top: 0px;
  margin-bottom: 0px;
  margin-right: 0px;
  margin-left: 0px;

  /* Padding */
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;

  /* Aignments */
  display: flex;
  flex-shrink: 1;
  flex-direction: row;
  aign-items: center;
  flex-grow: 1;
  vertical-align: baseline;

  /* Position */
  position: relative;
  z-index:0;

 
`
const TextBox = styled.textarea`
  /* Colors */
  color: #262626;

  /* Overflow */
  overflow-y: scroll;

  /* borders */
  :focus {
    border: 0;
  }
  border: none;

  /* Outline */
  outline-width: 0 !important;
  :focus {
    outline: 0;
  }

  /* Text Area Behavior */
  cursor: text;
  overflow-wrap: break-word;
  writing-mode: horizontal-tb;
  -webkit-writing-mode: horizontal-tb !important;

  text-indent: 0px;
  resize: none;
  word-spacing: normal;
  -webkit-rtl-ordering: logical;

  /* Aignments */
  text-align: start;

  /* Dimensions */

  /* Aignments */
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  /* Position */
 
  z-index:0;

`
const PostButton = styled.button`
  /* Colors */
  color: #3897f0;

  /* fonts */
  font-weight: 600;
  letter-spacing: normal;

  /* text */
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;

  /* borders */
  :focus {
    border: 0;
  }
  border: none;

  /* Dimensions */
  box-sizing: border-box;

  /* Outlines */
  outline-color: transparent;
  :focus {
    outline: 0;
  }

  /* Padding */
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;

  /* Button Behavoir */
  cursor: pointer;
  text-rendering: auto;

  /* Aignments */
  display: inline;
  align-items: flex-start;
  z-index:0;

  :disabled{
   opacity:0.4;
  }

`

export default ReplyBox
