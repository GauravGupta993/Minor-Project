import React, { useState } from "react";
import { View, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function UploadImage() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: false,  // Don't use base64, use file URI
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    let formData = new FormData();
    
    // Extract filename from URI
    let filename = uri.split("/").pop();
    
    // Infer file type
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    console.log(uri);

    formData.append("file", {
      uri,
      name: filename,
      type,
    });

    try {
    //   let response = await axios.post("http://your-backend-url/api/upload", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });

      Alert.alert("Success", "Image uploaded successfully!");
    //   console.log(response.data);
    console.log(image);
    } catch (error) {
      Alert.alert("Error", "Image upload failed!");
      console.error(error);
    }
  };

  return (
    <View>
      <Button title="Pick an image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}
