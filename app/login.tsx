import LoginScreen from "react-native-login-screen";
import { useAuthStore } from "./states/auth";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { useSession } from "./ctx";

export default function Login() {
  const { signIn } = useSession();
  const { setEmail, setPassword, login, error, success } = useAuthStore();
  useEffect(() => {
    if (error != "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error,
      });
    }
    // if (success) {
    //   router.replace("/(protected)/(tabs)");
    //   signIn("mellob");
    //   Toast.show({
    //     type: "success",
    //     text1: "Success",
    //     text2: "Login Success",
    //   });
    // }
  }, [error, success]);
  return (
    <LoginScreen
      logoImageSource={require("../assets/images/kc.png")}
      onLoginPress={() => {
        login(signIn);
      }}
      onSignupPress={() => {}}
      onEmailChange={setEmail}
      loginButtonText={"Login"}
      disableSignup
      children={<Toast />}
      onPasswordChange={setPassword}
    />
  );
}
