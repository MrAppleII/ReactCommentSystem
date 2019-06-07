import React, { Component } from "react"
import styled, { keyframes } from "styled-components"
import PropTypes from "prop-types"
import Comment from './Comment'
/*

    This is the SAMPLE Json data. This should be replaced. 

*/
let SampleJson = {
    data:[{"id":1,"user_Name":"Debbi","textBody":"Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.","userPhoto":"https://robohash.org/natusarchitectoimpedit.bmp?size=50x50&set=set1","likeAmount":38},
    {"id":2,"user_Name":"Aubrette","textBody":"Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.","userPhoto":"https://robohash.org/solutaoccaecatiexcepturi.jpg?size=50x50&set=set1","likeAmount":27},
    {"id":3,"user_Name":"Rayna","textBody":"Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.","userPhoto":"https://robohash.org/mollitiaexpeditaasperiores.jpg?size=50x50&set=set1","likeAmount":97},
    {"id":4,"user_Name":"Abbie","textBody":"Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.","userPhoto":"https://robohash.org/beataepraesentiumconsequatur.png?size=50x50&set=set1","likeAmount":8},
    {"id":5,"user_Name":"Annadiana","textBody":"In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.","userPhoto":"https://robohash.org/necessitatibuslaborumnemo.png?size=50x50&set=set1","likeAmount":96},
    {"id":6,"user_Name":"Tann","textBody":"Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.","userPhoto":"https://robohash.org/eligendinonsit.png?size=50x50&set=set1","likeAmount":41},
    {"id":7,"user_Name":"Cyrille","textBody":"Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.","userPhoto":"https://robohash.org/maximenatusut.jpg?size=50x50&set=set1","likeAmount":84},
    {"id":8,"user_Name":"Johann","textBody":"Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.","userPhoto":"https://robohash.org/magnamsimiliquelaborum.bmp?size=50x50&set=set1","likeAmount":34},
    {"id":9,"user_Name":"Hermon","textBody":"Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.","userPhoto":"https://robohash.org/quiaconsequaturasperiores.png?size=50x50&set=set1","likeAmount":70},
    {"id":10,"user_Name":"Tanitansy","textBody":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.","userPhoto":"https://robohash.org/laudantiumetveniam.bmp?size=50x50&set=set1","likeAmount":8}]
}
/*

    
    profileImgSrc: PropTypes.node.isRequired, // This is the profile image for comment. I will probably remove this later
    textBody: PropTypes.string, //body for a comment
    userName:PropTypes.string, //user name for the comment 
    condenseComment:PropTypes.bool, // set to true for children comments but it is no biggie.
    likeCount: PropTypes.number, //amount of likes a comment has
    replyCount: PropTypes.number, //this is the amount of replies a comment has
    CommentID:PropTypes.number, // Does nothing, I just figured it would be handy as prop. 




*/
const NewComments = []
class MainComment extends Component {
    constructor(props) {
      super(props)
      this.state = {
          maxComments:2,
          ReadMoreText: "",
          ReplyCount:10,
          LikeCount:17,
    }
}

componentDidMount() {
    this.setState({
        maxheight:"100px",
    })
    if(this.state.ReplyCount>0){
        this.setState({
            ReadMoreText:"Load More Comments",
        })
    }
    /*
        I recommend to get the replies somewhere in here for the comment. 

    */
}
componentWillUnmount() {}
LoadMoreComments = () =>{

    /*

        I recommend leaving this alone. It just renders more comments when the "load more comments"
        button is pressed. 
    */

    if(this.state.maxComments<this.state.ReplyCount){
        //we still have more comments to load. So lets load more. 
        this.setState({
            maxComments:this.state.maxComments+2,
            ReadMoreText:"Load More Comments",
        })
    }else{
        // We have run out of comments to load.
        this.setState({
            ReadMoreText:"",
        })
    }
  
}

HandleCreatingNewComment = (TextInput) =>{
    this.setState({
        ReplyCount:102,
    })
    NewComments.push(
        <FadeInDiv>
        <Comment onClickReply={this.HandleReplyButton} textBody={TextInput} likeCount={0} condenseComment={true} userName={this.props.userName} profileImgSrc={this.props.profileImgSrc} />
       </FadeInDiv>
    )
}
NewCommentRender = () =>(
    <>
    {NewComments.map((comment,i) => {
        return ( 
            <div key={i}>
                {comment}
            </div>
        );
 
    })
    
    }
    
    </>
);
/*
    LOOk HERE *******************************
    Here the text body of a reply box is being passed in. Then it gets passed to another function
    to be rendered as a function. 
*/
HandleReplyButton = (TextBoxValue) =>{
console.log("Comment Added!! "+TextBoxValue)
/*

    Add backend stuff BEFORE this.HandleCreatingNewComment(TextBoxValue)

*/

this.HandleCreatingNewComment(TextBoxValue)

}
/*

    This renders the Reply JSON 

*/

RepliesGenerator = (max) => (
    /*

        This needs to be modified to take the NEW Json data

    */
    <>
    {SampleJson.data.map((id,i) => {
        if(i<max){

        
        return ( 
            <FadeInDiv   key={i} >
                <Comment onClickReply={this.HandleReplyButton} textBody={id.textBody} likeCount={id.likeAmount} condenseComment={true} userName={id.user_Name} profileImgSrc={id.userPhoto} />
            </FadeInDiv>
        );
        }
    })}
    
    </>
);

render() {
    try {
      return (
      <div>
      
        <Comment 
        replyCount={this.props.replyCount}  
        onClickReply={this.HandleReplyButton} 
        likeCount={this.props.likeCount}
        userName={this.props.userName} 
        profileImgSrc={this.props.profileImgSrc}
         textBody={this.props.textBody}
          />
        <RepliesWrapper >
            {this.NewCommentRender()}
            {this.RepliesGenerator(this.state.maxComments)}
        </RepliesWrapper>
       {this.state.ReadMoreText? 
        <RepliesWrapper >
        <ReadMore onClick={this.LoadMoreComments}>{this.state.ReadMoreText}</ReadMore>
        </RepliesWrapper>
       : null }
      </div>
      ) 
    } catch (e) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log(e)
      }
      return null
    }
  }
}
MainComment.propTypes = {
    placeholder: PropTypes.string,
    profileImgSrc: PropTypes.node.isRequired,
    textBody: PropTypes.string,
    userName:PropTypes.string,
    condenseComment:PropTypes.bool,
    likeCount: PropTypes.number,
    replyCount: PropTypes.number,
    onClickReply: PropTypes.func,
    CommentID:PropTypes.number,
  }
  MainComment.defaultProps = {
    placeholder: "Add a comment...",
    textBody: "             ",
    userName: "",
    condenseComment:false,
    likeCount:0,
    replyCount:0,
    onClickReply: function(){},
  }
const ReadMore = styled.div`
width:100%;
cursor: pointer;
font-size:14px;
text-align:center;
:hover {
    text-decoration: underline;
    color: ${props => props.highlightColor || "rgb(99, 159, 255)"};
  }
`
const RepliesWrapper = styled.div`
margin-left:1.9rem;

display:flex;
flex-direction:column;
overflow: hidden;
`
const fade = keyframes`
  from {opacity: 0} 
  to {opacity: 1}
`
const FadeInDiv = styled.div`
animation: ${fade} ;
animation-duration:1.2s;
will-change: opacity;
`

export default MainComment