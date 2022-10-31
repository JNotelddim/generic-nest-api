import { initializeApp, FirebaseOptions } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import firebaseAdmin from 'firebase-admin';

// IMPORTANT: Your project directory must be called generic-nest-api for the
// emulator to work properly
const AUTH_EMULATOR_CONFIG: FirebaseOptions = {
  apiKey: 'generic-nest-api',
  appId: 'generic-nest-api',
  projectId: 'generic-nest-api',
};

// TODO: swap from direct access via process.env to use of @nestjs/config
// TODO: add app init checks for env vars by key

export function initFirebase() {
  console.log({ firebaseconfig: process.env.FIREBASE_CLIENT_CONFIG });

  const clientConfig = JSON.parse(
    process.env.FIREBASE_CLIENT_CONFIG || JSON.stringify(AUTH_EMULATOR_CONFIG),
  );

  const emulatorHost = process.env.FIREBASE_AUTH_EMULATOR_HOST || '';

  initializeApp(clientConfig);

  if (emulatorHost) {
    connectAuthEmulator(getAuth(), `http://${emulatorHost}`);
  }

  if (firebaseAdmin.initializeApp && !firebaseAdmin.apps?.length) {
    // Initialize Firebase admin
    // This initialization call does NOT include admin credentials because the credentials are supposedly stored in a
    // file whose filename is specified by the `GOOGLE_APPLICATION_CREDENTIALS` environment variable.
    // When the app is deployed, the commands inside `.profile` would create the `GOOGLE_APPLICATION_CREDENTIALS` file
    // and populate it with content of the `GOOGLE_CREDENTIALS` variable.
    // When running the app locally (which uses Firebase emulator), none of the above happens and that's fine because
    // the Firebase emulator doesn't care about admin credentials.
    firebaseAdmin.initializeApp({ projectId: clientConfig.projectId });
  }
}
