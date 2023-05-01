import { GoogleLogin } from 'react-google-login';
import { DiscordLogin } from 'react-discord-login';

const googleClientId = '885530994482-8uud37ocdkeeamf3a1rq840dpho94t0l.apps.googleusercontent.com';
const discordClientId = 'MTEwMjYwNzgyNDc3ODk3MzIyNQ.GJcQpp.ckzRf1os_Oyvx0ETybYaxpS3yE-yCMoIUnM-1A';

const loginWithGoogle = () => {
  return new Promise((resolve, reject) => {
    const onSuccess = (response) => {
      resolve(response);
    };

    const onFailure = (error) => {
      reject(error);
    };

    const options = {
      clientId: googleClientId,
      buttonText: 'Login with Google',
      onSuccess,
      onFailure,
      cookiePolicy: 'single_host_origin',
    };

    const GoogleLoginButton = new GoogleLogin(options);
    GoogleLoginButton.signIn();
  });
};

const loginWithDiscord = () => {
  return new Promise((resolve, reject) => {
    const onSuccess = (response) => {
      resolve(response);
    };

    const onFailure = (error) => {
      reject(error);
    };

    const options = {
      clientId: discordClientId,
      buttonText: 'Login with Discord',
      onSuccess,
      onFailure,
    };

    const DiscordLoginButton = new DiscordLogin(options);
    DiscordLoginButton.signIn();
  });
};

export { loginWithGoogle, loginWithDiscord };
