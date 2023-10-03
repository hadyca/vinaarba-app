import AppLoading from "expo-app-loading";
import React, { useCallback, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import LoggedOutNav from "./Navigators/LoggedOutNav";
import LoggedInNav from "./Navigators/LoggedInNav";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client, { isLoggedInVar, tokenVar, logUserOut } from "./apollo";
import { Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { loadLng } from "./i18n";

import * as SplashScreen from "expo-splash-screen";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [
      require("./assets/logo.png"),
      require("./assets/blankProfile.png"),
    ];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
  };

  //텍스트 크기 고정 (시스템 영향 받지 않음)
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;

  const preload = async () => {
    // logUserOut();
    const token = await AsyncStorage.getItem("token");
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    const lng = await AsyncStorage.getItem("lng");
    if (lng) {
      loadLng(lng);
    } else {
      loadLng("vn");
    }
    return preloadAssets();
  };

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await preload();
        // await new Promise((resolve) => setTimeout(resolve, 2000));

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <ApolloProvider client={client}>
      <NavigationContainer onReady={onLayoutRootView}>
        <StatusBar style="dark" />
        {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
      </NavigationContainer>
    </ApolloProvider>
  );
}
