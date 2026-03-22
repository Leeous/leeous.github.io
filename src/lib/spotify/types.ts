export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyArtist {
  name: string;
}

export interface SpotifyExternalUrls {
  spotify: string;
}

export interface SpotifyTrack {
  name: string;
  artists: SpotifyArtist[];
  external_urls: SpotifyExternalUrls;
  album: {
    images: SpotifyImage[];
    name: string;
  };
}

export interface SpotifyPlayHistory {
  track: SpotifyTrack;
  played_at: string;
}

export interface SpotifyRecentlyPlayedResponse {
  items: SpotifyPlayHistory[];
}