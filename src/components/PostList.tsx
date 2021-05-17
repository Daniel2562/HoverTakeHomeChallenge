import React, { useCallback, useState, useRef } from 'react';
import { FlatList, ListRenderItem, ViewToken } from 'react-native';

import { usePosts, useViewLayout } from '../hooks';
import PostItem from './PostItem';

interface PostListProps {}
// TODO: Extend PostList component to support autoplay
const PostList: React.FC<PostListProps> = () => {
  const posts = usePosts(2);
  const [viewLayout, onViewLayout] = useViewLayout();
  const [focusedItemId, setFocusedItemId] = useState<string>("0");

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 })
  const onViewRef = useRef((info: { viewableItems: Array<ViewToken>; changed: Array<ViewToken> })=> {
    const { viewableItems } = info;
    const [viewableItem] = viewableItems;
    if (viewableItem) {
      setFocusedItemId(viewableItem.key);
    } else {
      setFocusedItemId("0");
    }
  })

  const renderItem: ListRenderItem<Post> = useCallback(
    ({ item: post }) => {
      return <PostItem key={post.id} post={post} size={viewLayout} focused={post.id !== focusedItemId} />;
    },
    [viewLayout, focusedItemId],
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
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewConfigRef.current}
    />
  );
};

export default PostList;
