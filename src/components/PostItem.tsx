import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';

import Video from './Video';

interface PostItemProps {
  post: Post;
  size: { width: number; height: number };
  focused: boolean;
}
const PostItem: React.FC<PostItemProps> = ({ post, size, focused }) => {
  return (
    <ImageBackground
      key={post.thumbnailUrl}
      source={{ uri: post.thumbnailUrl }}
      blurRadius={4}
      style={{
        width: size.width,
        height: size.height,
        justifyContent: 'center',
      }}
    >
      <Video
        style={{ width: '100%', aspectRatio: 16 / 9 }}
        source={{ uri: post.videoUrl }}
        resizeMode="cover"
        repeat
        paused={focused}
      />
    </ImageBackground>
  );
};

export default PostItem;
