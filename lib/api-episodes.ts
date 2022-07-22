export type EpisodeType = {
  air_date: string;
  characters: string[];
  created: string;
  episode: string;
  id: number;
  name: string;
  url: string;
};

export type EpisodeResponse = {
  info: {
    count: number;
    next: string;
    pages: number;
    prev: number | null;
  };
  results: EpisodeType[];
};

export const getEpisodes = async () => {
  try {
    const episodes: EpisodeResponse = await fetch(
      "https://rickandmortyapi.com/api/episode"
    ).then((r) => r.json());

    if (episodes) {
      return episodes;
    }
  } catch (error) {
    return null;
  }
};
