import { useEnv } from '~/utils/useEnv';

export const ConnectToDiscord = () => {
  const { DISCORD_CLIENT_ID, DISCORD_AUTH_REDIRECT_URI } = useEnv();
  const redirectUri = encodeURIComponent(`${DISCORD_AUTH_REDIRECT_URI}`);
  return (
    <a
      href={`https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=token&scope=identify`}
    >
      Connect to Discord
    </a>
  );
};
