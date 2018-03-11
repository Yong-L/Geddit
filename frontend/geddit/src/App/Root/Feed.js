import React, { Fragment } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import {
  Label,
} from 'styled';

const PostWrapper = styled.div`
  display: inline-block;
  width: calc(60% - 18px);
  margin: 12px 6px;
  padding: 6px;
  border: 1px solid #bbb;
  `
  
const PostTitle = Label.extend`
  display: block;
  padding: 0;
  color: blue;
  font-size: 12px;
  text-align: left;

  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`


const Feed = ({ feed }) => {
  const renderPost = (post, index) => {
    return (
      <PostWrapper key={index} >
        <PostTitle>{post.title}</PostTitle>
        <div style={{fontSize: 10, display:'inline-block', marginLeft: 10}}>comment</div>
        <div style={{fontSize: 10, display:'inline-block', marginLeft: 10}}>share</div>
        <div style={{fontSize: 10, display:'inline-block', marginLeft: 10}}>upvote</div>
        <div style={{fontSize: 10, display:'inline-block', marginLeft: 10}}>report</div>
      </PostWrapper>
    )
  }

  return (
    <Fragment>
      { _.map(feed, renderPost) }
    </Fragment>
  )
}

export default Feed;