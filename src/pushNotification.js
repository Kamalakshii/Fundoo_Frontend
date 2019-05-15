import firebase from 'firebase';
import { notification } from "./services/noteServices"
export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: "598886060118"
  });
}
export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('token for push notification generated successfully', token);
    localStorage.setItem("push Token", token);
    var data = {
      pushToken: token,
      userId: localStorage.getItem("userId")
    };
    notification(data);
    return token;
  } catch (error) {
    console.error(error);
  }    
}
export const deleteToken = async () => {
  try {
    const messaging = firebase.messaging();
    const token = await messaging.getToken();
    const token1 = await messaging.deleteToken(token);
    console.log("token for push notification deleted successfully", token1);
  }
  catch (error) {
    console.log(error);
  }
}