import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import type { SpotifyPlayHistory, SpotifyRecentlyPlayedResponse, SpotifyTrack } from '../../src/lib/spotify/types';

type SpotifyPlaylistTracksResponse = {
  total: number;
  items: Array<{
    added_at: string;
    track: SpotifyTrack;
  }>;
};
// GraphQL schema
const typeDefs = `#graphql
  type Track {
    name: String!
    artist: String!
    albumArt: String
    addedAt: String
    playedAt: String
    url: String
  }

  type Query {
    recentTracks(limit: Int): [Track]
  }
  
  type Query {
    recentTracks(limit: Int): [Track]
    playlistTracks(playlistId: String!, limit: Int): [Track]
  }
`;

const getSpotifyAccessToken = async () => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token!,
    }),
  });

  const data = await response.json();
  return data.access_token;
};

const resolvers = {
  Query: {
    recentTracks: async (_: unknown, { limit = 3 }: { limit: number }) => {
      const accessToken = await getSpotifyAccessToken(); 
      
      const response = await fetch(
        `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}&market=US`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const data = (await response.json()) as SpotifyRecentlyPlayedResponse;

      return data.items.slice(0, limit).map((item: SpotifyPlayHistory) => ({
        name: item.track.name,
        artist: item.track.artists[0].name,
        albumArt: item.track.album.images[0]?.url,
        playedAt: item.played_at,
        url: item.track.external_urls.spotify,
      }));
    },
    playlistTracks: async (_: unknown, { playlistId }: { playlistId: string, limit: number }) => {
      try {
        const accessToken = await getSpotifyAccessToken();

        // Always return the last 3 tracks added to the playlist.
        const itemsToReturn = 3;

        const metaResponse = await fetch(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks?fields=total&limit=1`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        if (!metaResponse.ok) {
          const errorText = await metaResponse.text();
          throw new Error(`Spotify playlist meta request failed: ${metaResponse.status} ${metaResponse.statusText} - ${errorText}`);
        }

        const metaData = (await metaResponse.json()) as Pick<SpotifyPlaylistTracksResponse, 'total'>;
        const offset = Math.max(0, metaData.total - itemsToReturn);

        const response = await fetch(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=US&limit=${itemsToReturn}&offset=${offset}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Spotify playlist request failed: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = (await response.json()) as SpotifyPlaylistTracksResponse;

        return data.items
          .sort((a, b) => new Date(b.added_at).getTime() - new Date(a.added_at).getTime())
          .map((item) => ({
            name: item.track.name,
            artist: item.track.artists[0]?.name,
            albumArt: item.track.album.images[0]?.url,
            addedAt: item.added_at,
            url: item.track.external_urls.spotify,
          }));
      } catch (error) {
        console.error("Playlist Fetch Error:", error);
        return [];
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, 
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ footer: false })
  ],
});

export const handler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventRequestHandler(),
);