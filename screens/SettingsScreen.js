import { StyleSheet, Text, Image, View, TouchableOpacity, Modal, Switch, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { storeData } from "../utils/StorageService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Camera, CameraType } from "expo-camera";
import * as ScreenOrientation from "expo-screen-orientation";

export default function SettingsScreen({ navigation }) {
  const [profilePicture, setProfilePicture] = useState(null)
  const [orientation, setOrientation] = useState(false)

  const [cameraPermission, setCameraPermission] = useState(null)
  const [cameraRef, setCameraRef] = useState(null)
  const [cameraVisibility, setCameraVisibility] = useState(false)
  const [cameraType, setCameraType] = useState(CameraType.back)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setCameraPermission(status === 'granted')
    })()
  }, [])

  useFocusEffect(() => {
    AsyncStorage.getItem('profilePicture').then((profilePicture) => {
      if (profilePicture) {
        setProfilePicture(profilePicture)
      }
    })
  })

  const takeCameraPicture = async () => {
    try {
      if (cameraPermission === 'true') {
        alert('Please accept the camera permission to use it.');

        return;
      }

      if (cameraRef) {
        const picture = await cameraRef.takePictureAsync();

        setProfilePicture(picture.uri)
        try {
          await storeData('profilePicture', picture.uri)
        } catch (error) {
          console.log(error)
        }

        changeCameraScreen()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const changeCameraScreen = () => {
    setCameraVisibility(current => (current === false ? true : false ))
  }

  const changeCameraType = () => {
    setCameraType(current => (current === CameraType.back ? CameraType.front : CameraType.back))
  }

  const changeOrientation = async (value) => {
    setOrientation(value);
    if (value) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      )
    } else {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      )
    }
  };

  return (
    <ScrollView>
      <View style={styles.profile}>
        <View style={styles.profileContainer}>
          {profilePicture ? (
            <Image style={styles.profileImage} source={{ uri: profilePicture }}></Image>
          ) : (
            <Image style={styles.profileImage} source={require("../assets/user.jpg")}></Image>
          )}
          <TouchableOpacity onPress={changeCameraScreen} style={styles.camera}>
            <Image
              style={styles.cameraImage}
              source={require("../assets/camera.png")}
            ></Image>
          </TouchableOpacity>
        </View>
        <Text style={styles.username}>John Doe</Text>
      </View>
      <View>
          {/* <Text style={styles.titleInfos}>Informations</Text> */}
          <Text style={styles.titleInfos}>Options</Text>
          <View style={styles.switch}>
            <Text>Change orientation screen</Text>
            <Switch
              onValueChange={(value) => changeOrientation(value)}
              value={orientation}
            />
          </View>
        </View>
      <Modal style={styles.camera} visible={cameraVisibility}>
        <Camera style={styles.cameraContainer} type={cameraType} ref={(ref) => setCameraRef(ref)}>
          <View style={styles.cameraButtons}>
            <TouchableOpacity style={styles.close} onPress={changeCameraScreen}>
              <Image style={styles.closeImage} source={require('../assets/close.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flip} onPress={changeCameraType}>
              <Image style={styles.flipImage} source={require('../assets/flip.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.takePicture} onPress={takeCameraPicture}>
              <View style={{
                width: 70,
                height: 70,
                borderWidth: 5,
                borderColor: 'white',
                borderRadius: 99
              }}></View>
            </TouchableOpacity>
          </View>
        </Camera>
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  switch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 10
  },
  titleInfos: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10
  },
  camera: {
    flex: 1,
    justifyContent: "center"
  },
  cameraContainer: {
    flex: 1,
  },
  cameraButtons: {
    flex: 1,
    position: "relative"
  },
  takePicture: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    bottom: 25
  },
  flip: {
    position: "absolute",
    right: 25,
    top: 25
  },
  flipImage: {
    width: 30,
    height: 30
  },
  close: {
    position: "absolute",
    left: 25,
    top: 25
  },
  closeImage: {
    width: 30,
    height: 30
  },
  profile: {
    marginTop: 35,
    alignItems: "center"
  },
  profileContainer: {
    width: 154,
    height: 154,
    backgroundColor: "#FF4F4F",
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  profileImage: {
    width: 146,
    height: 146,
    borderRadius: 99,
  },
  camera: {
    position: "absolute",
    width: 43,
    height: 43,
    backgroundColor: "#FF4F4F",
    borderRadius: 99,
    bottom: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraImage: {
    width: 26,
    height: 26,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
});
