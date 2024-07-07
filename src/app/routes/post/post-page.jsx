import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { getPostById } from "~/api/post";
import Comment from "~/features/comments/components/comment";
import MediaViewer from "~/features/media-viewer/components/media-viewer";
import PostAction from "~/features/post/components/post-action";
import PostDisplay from "~/features/post/components/post-display";
import PostHeader from "~/features/post/components/post-header";
const Text = styled.p`
  font-size: 15px;
  margin-top: 5px;
  font-weight: 400;
`;
const PostPage = () => {
  const { postId } = useParams();
  const [searchParams] = useSearchParams();
  const [post, setPost] = useState({});
  const [react, setReact] = useState(null);
  useEffect(() => {
    fetchMoreData();
  }, [postId]);
  console.log(postId);
  const fetchMoreData = async () => {
    await getPostById(postId).then((res) => {
      if (res.code === 200 && res.data !== null) {
        setPost(res.data);
      }
    });
  };

  if (!post) return <div>khong co </div>;

  return <PostDisplay post={post} setReact={setReact} react={react} />;
};

export default PostPage;