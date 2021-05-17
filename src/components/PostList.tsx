import React, { useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import { usePosts, useViewLayout } from '../hooks';
import PostItem from './PostItem';

interface PostListProps {}
// TODO: Extend PostList component to support autoplay
const PostList: React.FC<PostListProps> = () => {
  const posts = usePosts(2);
  const [viewLayout, onViewLayout] = useViewLayout();

  const renderItem: ListRenderItem<Post> = useCallback(
    ({ item: post }) => {
      return <PostItem key={post.id} post={post} size={viewLayout} />;
    },
    [viewLayout],
  );

  const getItemLayout = useCallback(
    (_, index: number) => {
      return {
        length: viewLayout.height,
        offset: viewLayout.height * index,
        index,
      };
    },
    [viewLayout],
  );

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: 'red' }}
      onLayout={onViewLayout}
      data={posts}
      renderItem={renderItem}
      getItemLayout={getItemLayout}
      snapToAlignment="start"
      pagingEnabled
      removeClippedSubviews
    />
  );
};

export default PostList;
