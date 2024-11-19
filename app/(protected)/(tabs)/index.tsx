import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Toast from "react-native-toast-message";
import { FFmpegKit, ReturnCode } from "ffmpeg-kit-react-native";

export default function VideoPicker() {
  const [video, setVideo] = React.useState("");
  return (
    <View style={styles.container}>
      {/* Video Picker Preview */}
      <View style={styles.videoContainer}>
        <Text
          style={styles.placeholderText}
          onPress={async () => {
            const document = await DocumentPicker.getDocumentAsync({
              type: "video/*",
            });
            if (!document.canceled) {
              setVideo(document.assets[0].uri);
            }
          }}
        >
          Select a Video
        </Text>
      </View>

      {/* Convert to GIF Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (video === "") {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Please select a video first",
            });
          } else {
            Toast.show({
              type: "info",
              text1: "Info",
              text2: "Converting video to GIF",
            });
            FFmpegKit.execute(
              `-i ${video} -vf "fps=30,scale=800:-1:flags=lanczos" -c:v gif clips/output.gif`,
            ).then(async (session) => {
              const statistics = await session.getStatistics();
              console.log(
                `FFmpeg process exited with statistics ${statistics}`,
              );
              const returnCode = await session.getReturnCode();
              if (ReturnCode.isSuccess(returnCode)) {
                Toast.show({
                  type: "success",
                  text1: "Success",
                  text2: "Video converted to GIF",
                });
              } else if (ReturnCode.isCancel(returnCode)) {
                // CANCEL
              } else {
                // ERROR
              }
            });
          }
        }}
      >
        <Text style={styles.buttonText}>Convert to GIF</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  videoContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  placeholderText: {
    color: "#999",
    fontSize: 16,
  },
  button: {
    width: "60%",
    paddingVertical: 15,
    backgroundColor: "#007bff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
