# Sayarati Android Release Steps

This Android app opens the live Sayarati app at:

https://app.sayarati.online

The user signs in with the same WhatsApp number, so the same database account works on web and Android.

## First build

1. Install Android Studio.
2. Open the folder `android`.
3. Let Android Studio install any missing Android SDK/Gradle items.
4. Build the app.
5. Test on a real Android phone.
6. Create a signed Android App Bundle (`.aab`) for Google Play.

## Google Play requirement

The project targets Android 15 / API 35, which is currently required for new Google Play app submissions.

## App identity

- App name: Sayarati
- Package name: `online.sayarati.app`
- Version: `1.0.0`
- Version code: `1`
