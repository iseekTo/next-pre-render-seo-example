import { NextPage } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";

import { type EpisodeType, getEpisodes } from "../../lib/api-episodes";

interface IProps {
  episode: EpisodeType;
}

const Episode: NextPage<IProps> = ({ episode }) => {
  const router = useRouter();

  if (!router.isFallback && !episode) {
    return <ErrorPage statusCode={404} />;
  }

  // 可确保用户始终获得快速的体验，同时保留快速构建和静态生成的优势。
  if (router.isFallback) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <article style={{ textAlign: "center" }}>
      <h1>{episode.name}</h1>

      <p>Created: {episode.air_date}</p>

      <div>
        <h2>About character url</h2>
        {episode.characters.map((character) => (
          <p key={character}>{character}</p>
        ))}
      </div>
    </article>
  );
};

export default Episode;

export const getStaticPaths = async () => {
  // [id] => `/episodes/${id}`
  // 必须与文件命名的格式一致
  const episodes = await getEpisodes();
  const paths = episodes?.results.map(({ id }) => `/episodes/${id}`) ?? [];

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  try {
    const episode: EpisodeType = await fetch(
      `https://rickandmortyapi.com/api/episode/${params.id}`
    ).then((r) => r.json());

    if (!episode || !("id" in episode)) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        episode,
      },

      /**
       * 重新生成页面的契机有两种
       * - 当页面重新发起请求时
       * - 自定义时长(单位秒) 这里是10秒后会再次生成页面，使得之前的缓存失效
       */
      revalidate: 10,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
