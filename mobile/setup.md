Setup Mobile
------

Packages:
 - [expo](https://expo.dev)
 - [Nativewind](https://nativewind.dev) (UI with tailwindcss)
 - [React Navigation](https://reactnavigation.org/) (Navigation)
 - [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) (Animations)

Setup Expo app
 - `npx create-expo-app mobile --template`
 - Chose "Blank (TypeScript)"
 - Start your app:
   - `npx expo start`

Setup Nativewind in expo
 - `npm i nativewind`
 - `npm i -D tailwindcss`
 - do setup tailwindcss
   - `npx tailwindcss init`
 - `className` does not exist by default
   - how to resolve: [https://www.nativewind.dev/getting-started/typescript](https://www.nativewind.dev/getting-started/typescript)

Setup React Navigation
 - `npm install @react-navigation/native`
 - `npx expo install react-native-screens react-native-safe-area-context`
 - `npm install @react-navigation/native-stack` (Stack navigation)
