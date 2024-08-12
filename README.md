# react-native-video-list

This package allows automatic pausing of the video that comes out of the screen and automatic playing of the video that enters the screen in the video listing made in React Native projects (for example, the feed page of social media projects such as Instagram, LinkedIn, Twitter, etc.)

# Install

```bash
$ npm i react-native-video-list
```

or

```bash
$ yarn add react-native-video-list
```

<br>

# Example App

https://github.com/shoki61/video_app_example

![example gif](https://github.com/shoki61/video_app_example/blob/main/example.gif?raw=true)

# Use

```tsx
import { TouchableOpacity, Dimensions, SafeAreaView } from "react-native";
import VideoList from "react-native-video-list";

const { width } = Dimensions.get("window");

const data = [
  {
    id: "post-1",
    videoUrl: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,
  },
  {
    id: "post-2",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "post-3",
    videoUrl: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4`,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "post-5",
    videoUrl: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4`,
  },
  {
    id: "post-7",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VideoList
        data={data}
        renderItem={({ item, setPaused, paused, isVisible }) => (
          <TouchableOpacity
            onPress={() => {
              if (item.videoUrl?.length > 0) {
                if (isVisible) {
                  setPaused(!paused);
                }
              }
            }}
          >
            <Video
              source={{ uri: item.videoUrl }}
              style={{ width: width, height: 200 }}
              paused={paused}
              resizeMode="cover"
              repeat
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default App;
```

## Props

| Prop                        |    Type    | Require | Description                                                                                                                                                  |
| :-------------------------- | :--------: | :-----: | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data                        |  `Array`   | `true`  | An array list of objects                                                                                                                                     |
| renderItem                  | `function` | `true`  | A method that returns each item with the parameters `item`, `setPaused`, `paused` and `isVisible`. You should use the parameters as shown in the sample code |
| itemVisiblePercentThreshold |  `number`  | `false` | Percentage of the element that is visible                                                                                                                    |
| autoPlay                    | `boolean`  | `false` | Enables video element to play automatically                                                                                                                  |

<br>
