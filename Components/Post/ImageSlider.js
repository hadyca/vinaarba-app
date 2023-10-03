import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  useWindowDimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ImageViewer from "react-native-image-zoom-viewer";

const Container = styled.View`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

const Img = styled.Image``;

const DotView = styled.View`
  flex-direction: row;
  position: absolute;
  align-self: center;
  bottom: 0;
`;

const Dot = styled.Text`
  color: ${(props) => (props.active ? "white" : "#888")};
  margin: 3px;
  font-size: ${(props) => props.size / 40}px;
`;

export default function ImageSlider({ file }) {
  const [active, setActive] = useState(0);
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState({
    isModalOpened: false,
    currentImageIndex: 0,
  });

  const { width } = useWindowDimensions();

  const height = Math.ceil(width * 0.6);

  const handleScroll = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );

    if (slide !== active) {
      setActive(slide);
    }
  };

  const openModal = (index) => {
    setIsModalOpen({ isModalOpened: true, currentImageIndex: index });
  };
  useEffect(() => {
    if (file) {
      file.map((item) =>
        setImages((images) => [...images, { url: item.fileUrl }])
      );
    }
  }, []);

  return (
    <Container width={width} height={height}>
      <ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={Platform.OS === "ios" ? 16 : null}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        style={{ width, height }}
      >
        {file &&
          file.map((item, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => openModal(index)}
            >
              <Img
                key={index}
                source={{ uri: item.fileUrl }}
                style={{ width, height, resizeMode: "cover" }}
              />
            </TouchableWithoutFeedback>
          ))}
      </ScrollView>
      <DotView>
        {file &&
          file.map((item, index) => (
            <Dot active={index === active} key={index} size={width}>
              ⬤
            </Dot>
          ))}
      </DotView>
      <Modal visible={isModalOpen.isModalOpened} transparent={true}>
        <ImageViewer
          imageUrls={images}
          index={isModalOpen.currentImageIndex}
          saveToLocalByLongPress={false}
          renderHeader={() => (
            <TouchableOpacity
              style={{
                zIndex: 3,
                position: "absolute",
                top: 50,
                left: 10,
              }}
              onPress={() =>
                setIsModalOpen({ isModalOpened: false, currentImageIndex: 0 })
              }
            >
              <Ionicons name="close-outline" size={35} color="white" />
            </TouchableOpacity>
          )}
        />
      </Modal>
    </Container>
  );
}
