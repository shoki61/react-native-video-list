import React, { useState, useRef, useEffect } from "react";
import { FlatList, FlatListProps } from "react-native";

let useFocusEffect: any;
try {
  useFocusEffect = require("@react-navigation/native").useFocusEffect;
} catch (error) {
  useFocusEffect = null;
}

interface VideoFlatListInterface {
  data: any;
  renderItem: (args: {
    item: object;
    index: number;
    paused: boolean;
    setPaused: (paused: boolean) => void;
    isVisible: boolean;
  }) => React.ReactElement;
  itemVisiblePercentThreshold?: number;
  autoPlay?: boolean;
}

type VideoFlatListProps<T> = VideoFlatListInterface &
  Omit<FlatListProps<T>, keyof VideoFlatListInterface>;

interface PostItem {
  item: object;
  index: number;
  isVisible: boolean;
  isCentered: boolean;
  renderItem: (args: {
    item: object;
    index: number;
    paused: boolean;
    setPaused: (paused: boolean) => void;
    isVisible: boolean;
  }) => React.ReactElement;
  autoPlay: boolean;
}

const Post: React.FC<PostItem> = ({
  item,
  index,
  isVisible,
  isCentered,
  renderItem = () => {},
  autoPlay,
}) => {
  const [paused, setPaused] = useState(
    autoPlay ? !isCentered || !isVisible : true
  );

  useEffect(() => {
    setPaused(autoPlay ? !isCentered || !isVisible : true);
  }, [isCentered, isVisible]);

  return <>{renderItem({ item, index, paused, setPaused, isVisible })}</>;
};

function VideoFlatList<T>({
  data,
  renderItem,
  itemVisiblePercentThreshold = 75,
  autoPlay = true,
  ...props
}: VideoFlatListProps<T>) {
  const [centeredItem, setCenteredItem] = useState(null);
  const [isScreenFocused, setIsScreenFocused] = useState(true);

  const useCustomFocusEffect = (callback: any) => {
    if (typeof useFocusEffect === "function") {
      useFocusEffect(callback);
    }
  };

  useCustomFocusEffect(
    React.useCallback(() => {
      setIsScreenFocused(true);
      return () => {
        setIsScreenFocused(false);
      };
    }, [])
  );

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const centerItem = viewableItems.find(
        (item: any) => item.isViewable && item.item.id === centeredItem
      );

      if (!centerItem) {
        const newCenterItem = viewableItems.reduce(
          (prev: any, current: any) => {
            return Math.abs(current.percentVisible - 100) <
              Math.abs(prev.percentVisible - 100)
              ? current
              : prev;
          }
        );
        setCenteredItem(newCenterItem.item.id);
      }
    } else {
      setCenteredItem(null);
    }
  });

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold,
    minimumViewTime: 300,
  });

  const renderItemFlatList = ({ item, index }: any) => (
    <Post
      item={item}
      isVisible={isScreenFocused}
      isCentered={centeredItem === item.id && isScreenFocused}
      index={index}
      renderItem={renderItem}
      autoPlay={autoPlay}
    />
  );

  return (
    <FlatList
      {...props}
      data={data}
      renderItem={renderItemFlatList}
      keyExtractor={(_, i) => i.toString()}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig.current}
    />
  );
}

export default VideoFlatList;
