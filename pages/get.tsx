import { NextPage } from "next";
import { EpisodeType } from "../lib/api-episodes";

interface IProps {
  episode?: EpisodeType;
}

/** 尝试在此页面使用 getServerSideProps  */
const GetTeb: NextPage<IProps> = ({ episode }) => {
  return (
    <article style={{ textAlign: "center" }}>
      <h1>{episode?.name}</h1>

      <p>Created: {episode?.air_date}</p>
    </article>
  );
};

export default GetTeb;

export const getServerSideProps = async () => {
  try {
    const episodeApi = "https://rickandmortyapi.com/api/episode/1";
    const episode: EpisodeType = await fetch(episodeApi).then((res) =>
      res.json()
    );

    if (!episode) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        episode,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
