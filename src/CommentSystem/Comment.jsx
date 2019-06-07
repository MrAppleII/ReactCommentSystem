import React, { Component } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import ProfilePhoto from "./ProfilePhoto"
import LikeIcon from "./icons/like_icon.svg"
import ReplyIcon from "./icons/comment_icon.svg"
import SocialActionButton from "./SocialActionButton"
import ReplyBox from "./ReplyBox"
/*
    File: Comment.jsx
    Description: Creates a comment box that has automatically resizes depending on the content. 
    Props:
   profileImgSrc: PropTypes.node.isRequired,   Profile image for the comment
    placeholder: PropTypes.string,  This is the placeholder text in the comment box
    textBody: PropTypes.string, Body of the comment
    userName : PropTypes.string, Username of the person who made the comment
    condenseComment: PropTypes.bool, if you set this to true, the social action text dissapears
    likeCount: PropTypes.number, this is the amount of likes this comment has.
    replyCount: PropTypes.number, this is the number of replies a comment has. 
    onClickReply: PropTypes.func, this is a method that runs after the "Reply" button has been hit. 

    This is SHOULD only accept props and reprent the comments. Something else should do the 
    logic. 


*/

class Comment extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      showReplyBox: false,
      textBoxValue: "",
      currentLikeCount: this.props.likeCount,
      likedByUser: false,
      currentReplyCount: this.props.replyCount,
    }
  }
  componentDidMount() {}
  componentWillUnmount() {}

  changeDisplayReplyBox = () => {
    this.setState({
      showReplyBox: !this.state.showReplyBox,
    })
  }

  getLikeText = () =>{
    if(this.state.currentLikeCount>0){
      if(this.props.condenseComment){
        return this.state.currentLikeCount+""
      }else{
        if(this.state.currentLikeCount==1)
        {
          return this.state.currentLikeCount+" Like"
        }
        return this.state.currentLikeCount+" Likes"
      }
      
    }else{
      return ""
    }

  }

  getReplyText = () =>{
    if(this.state.currentReplyCount>0){
      if(this.props.condenseComment){
        return ""
      }else{
        return this.state.currentReplyCount+" Replies"
      }
      
    }else{
      return ""
    }

  }

  likeButtonHandler = () =>{
    if(!this.state.likedByUser){

      this.setState({
        currentLikeCount: this.state.currentLikeCount+1,
        likedByUser: true,
      })
    }
    else{
      // It has already been liked.
      this.setState({
        currentLikeCount: this.state.currentLikeCount-1,
        likedByUser: false,
      })


    }
   

  }
  ReplyButtonHandler = (textBoxValue) =>{
      this.props.onClickReply(textBoxValue)
      this.changeDisplayReplyBox()
  }

  render() {
    try {
      return (
        <CommentContainer>
          <InnerContainer>
            <CommentForm>
              <PhotoPositionWrapper>
                <ProfilePhoto imageSrc={this.props.profileImgSrc} size={30} />
              </PhotoPositionWrapper>
              <CommentBody>
                
                <TextContent>
                < UserName>{this.props.userName}</ UserName>
                {this.props.textBody}</TextContent>
                <BottomSocialButtons>
                  <SocialActionButton ButtonText={ this.getLikeText()} ButtonClick={this.likeButtonHandler }  iconSrc={LikeIcon} />
                  <SocialActionButton
                    ButtonText={this.getReplyText()}
                    ButtonClick={this.changeDisplayReplyBox}
                    iconSrc={ReplyIcon}
                  />
                </BottomSocialButtons>
                <ReplyBox onReplyClick={this.ReplyButtonHandler} isVisible={this.state.showReplyBox} />
              </CommentBody>
            </CommentForm>
            <ReplyWrapper />
          </InnerContainer>
        </CommentContainer>
      )
    } catch (e) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log(e)
      }
      return null
    }
  }
}
Comment.propTypes = {
  placeholder: PropTypes.string,
  profileImgSrc: PropTypes.node,
  textBody: PropTypes.string,
  userName:PropTypes.string,
  condenseComment:PropTypes.bool,
  likeCount: PropTypes.number,
  replyCount: PropTypes.number,
  onClickReply: PropTypes.func,
}
Comment.defaultProps = {
  placeholder: "Add a comment...",
  textBody: "             ",
  userName: "",
  condenseComment:false,
  likeCount:0,
  replyCount:0,
  onClickReply: function(){},
}
/***  CSS PROPERTIES  ***/
const UserName = styled.div`
font-weight:bold;

`
const CommentContainer = styled.div`
  /* Colors */
  color: #000;

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
  padding: 12px 16px 0;

  /* Aignments */
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  vertical-align: top;
  justify-content: center;
  z-index: 0;

  flex-wrap: nowrap;

  /* Position */
  position: relative;
`
const ReplyWrapper = styled.div`
  margin-left: 0.4rem;
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
  z-index: 0;

  /* Position */
  position: relative;

  /* Aignments */
  display: flex;
  flex-direction: column;
  aign-items: center;
  flex: 1;
  vertical-align: baseline;
`

const CommentForm = styled.div`
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

  /* Alignments */
  display: flex;
  flex-shrink: 1;
  flex-direction: row;
  flex-grow: 1;
  /* Position */
  position: relative;
  z-index: 0;
`
const PhotoPositionWrapper = styled.div`
  align-self: flex-start;
  flex-shrink: 0;
  position: relative;
`
const TextContent = styled.div`
  /* Aignments */
  border-radius: 0px 0px ${props => props.bottomBorderRadius || "20"}px
    ${props => props.bottomBorderRadius || "20"}px;

  background-color: ${props => props.containerColor || "rgb(236, 236, 236);"};
  flex-grow: 1;
  vertical-align: baseline;

  word-wrap: break-word;
  text-align: left;
  white-space: pre-wrap;

  /* Padding */
  padding: 10px 16px 12px 12px;
  /* Margin */
  margin-left: 0.4rem;
  /* Color */
  color: rgba(0, 0, 0, 0.75);
`
const BottomSocialButtons = styled.div`
  display: flex;
  flex-direction: row;
  /* Margin */

  margin-left: 0.4rem;
`
const CommentBody = styled.div`
  display: flex;
  flex-direction: column;
`

export default Comment
