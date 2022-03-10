#!/bin/bash

echo "rm -rf ios/build..."
rm -rf ios/build

echo "rm -rf android/app/build..."
rm -rf android/app/build

echo "rm -rf ios/pods..."
rm -rf ios/pods

echo "Removed all Xcode derived data..."
rm -rf ~/Library/Developer/Xcode/DerivedData

echo "rm -rf $TMPDIR/react-*..."
rm -rf $TMPDIR/react-*

echo "rm -rf $TMPDIR/haste-map-react-native-packager-*..."
rm -rf $TMPDIR/haste-map-react-native-packager-*

echo "rm -rf $TMPDIR/metro-*..."
rm -rf $TMPDIR/metro-*

echo "watchman watch-del-all"
watchman watch-del-all

echo "gradlew clean..."
cd android && ./gradlew --stop && ./gradlew clean && cd ..

echo "rm -rf node_modules..."
rm -rf node_modules

echo "npm install..."
npm install

echo "pods install..."
cd ios/ && arch -x86_64 pod install --repo-update && cd ..

echo "npx jetify..."
npx jetify

echo "npm start -- --reset-cache"
npm start -- --reset-cache