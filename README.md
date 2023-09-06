# BriefMaster - React Native Text Summaries App
![screen](https://github.com/Jigar-Gadhia/BriefMaster/assets/65450057/9d1e3ae4-9d4a-4058-bfd9-6b6b7f4a209c)

BriefMaster is a mobile application developed using React Native that aims to simplify the process of creating and accessing text summaries. This app allows users to efficiently generate concise summaries of longer texts, making it a valuable tool for students, researchers, professionals, and anyone who needs to quickly grasp the key points of a document.

## Features

- **Text Summarization**: BriefMaster utilizes advanced natural language processing techniques to generate accurate and coherent text summaries from longer inputs.

- **User-Friendly Interface**: The app offers an intuitive and user-friendly interface, ensuring a seamless experience for users while creating or reading summaries.

- **Customization Options**: BriefMaster allows users to customize the length and style of the summaries according to their preferences.

## Installation

To run the BriefMaster app on your local machine, follow these steps:

1. Git clone this project with following command
```
git clone https://github.com/Jigar-Gadhia/BriefMaster.git
```
2. Navigate to the project directory:
```
cd BriefMaster
```
3. Install the required dependencies:
```
npm install
```

## Get the API

1. Open the following URL in your web browser and login/signup with your MeaningCloud account
```
https://www.meaningcloud.com/developer/login
```
2. Once you are logged in, click on APIS as per the below image

![image](https://github.com/Jigar-Gadhia/BriefMaster/assets/65450057/59ec09ac-b92e-4cb8-988b-8421c2d11d8d)


3. Scroll down and click on Summarization as the below image

![image](https://github.com/Jigar-Gadhia/BriefMaster/assets/65450057/e4400453-5721-4911-abbf-8c1e63dd0e77)

4. Click on Test Console

![image](https://github.com/Jigar-Gadhia/BriefMaster/assets/65450057/59217b97-e518-46a7-81d4-d52a16ee6024)

5. Copy data of Key and Endpoint and place it in HomeScreen Component.
   
![image](https://github.com/Jigar-Gadhia/BriefMaster/assets/65450057/85af642c-c29a-4316-8b72-aa68bb7e4355)

6. You are done with the api.

### Note: Copy api key and url in saperate file or in .env for security reason.

## Run Android

Open command prompt / terminal inside the root directory of the project and run following command :

   ```
   cd android/app
   ```
   
  Create debug keystore :
   
   ```
   keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
   ```
   
   Make sure app/build.gradle file contain following details:
   ```
android {
    ...
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        ...
    }
    ...
    signingConfigs {
        debug {
            storeFile file('relative/path/to/your/debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
        ...
    }
    ...
}
   ```
 Clean the project by running following commands in terminal / command prompt from the project's root directory: 
```
cd android
```
For windows
```
gradlew clean 
```
For Linux / Mac
```
./gradlew clean
```
      
  Run Android :
```
npm run android
# or
yarn android
# or
npx react-native run-android # I personally use this command
```
# Dependencies
Please refer [Package.json](https://github.com/Jigar-Gadhia/BriefMaster/blob/main/package.json) for more information

# Development Dependencies
Please refer [Package.json](https://github.com/Jigar-Gadhia/BriefMaster/blob/main/package.json) for more information

# License
This project is licensed under the [MIT License](https://github.com/Jigar-Gadhia/BriefMaster/blob/main/LICENSE)

# Acknowledgments
I would like to thank the contributors and all the open-source libraries that made this project possible, Aspecially [MeaningCloud](https://www.meaningcloud.com/) for providing amazing APIs.
