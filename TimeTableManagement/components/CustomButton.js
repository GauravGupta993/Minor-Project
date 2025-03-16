import { TouchableOpacity, Text } from "react-native";
import React from "react";

const CustomButton = ({ bgColor, textColor, content, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress} // ✅ Handle press here
      style={{
        backgroundColor: bgColor,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 10,
      }}
    >
      <Text style={{ color: textColor, fontWeight: "bold", fontSize: 16 }}>
        {content}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
