export default {
    expo: {
        name: "SkyCast",
        slug: "SkyCast",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/images/icon-new.png",
        scheme: "myapp",
        userInterfaceStyle: "automatic",
        splash: {
            image: "./assets/images/splash_screen.png",
            resizeMode: "cover",
            backgroundColor: "#ffffff"
        },
        ios: {
            supportsTablet: true
        },
        android: {
            config: {
                googleMaps: {
                    apiKey: "AIzaSyDInZK1NSeJjXMb48l4tm6awxv8LXJtcH8",
                }
            },
            adaptiveIcon: {
                foregroundImage: "./assets/images/adaptive-icon-new.png",
                backgroundColor: "#ff0000"
            },
            permissions: [
                "android.permission.ACCESS_COARSE_LOCATION",
                "android.permission.ACCESS_FINE_LOCATION"
            ],
            googleServicesFile: "./google-services.json",
            package: "lk.ijse.skycast"
        },
        web: {
            bundler: "metro",
            output: "static",
            favicon: "./assets/images/favicon.png"
        },
        plugins: [
            "expo-router",
            "@react-native-google-signin/google-signin",
            [
                "expo-location",
                {
                    "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
                }
            ],
            [
                "expo-build-properties",
                {
                    "android": {
                        "usesCleartextTraffic": true
                    }
                }
            ]
        ],
        experiments: {
            typedRoutes: true
        },
        extra: {
            router: {
                origin: false
            },
            eas: {
                projectId: "98bb2224-0d85-4380-906b-9ffc93a18a20"
            },
        }
    }
};
