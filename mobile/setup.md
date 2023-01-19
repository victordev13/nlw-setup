Setup Mobile
------

Packages:
 - [expo](https://expo.dev)
 - [Nativewind](https://nativewind.dev) (UI with tailwindcss)

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
