import { NextPage, NextPageContext } from "next";
import { NextSeo } from "next-seo";

interface IProps {
  userAgent?: string;
  character?: any;
}

const InitialExample: NextPage<IProps> = ({ userAgent, character }) => {
  return (
    <>
      <NextSeo
        title="Simple Usage Example about init page"
        description="A short description goes here init page"
      />

      <main>
        {character && (
          <>
            <span>{character.name}</span>
            <img src={character.image} alt="" />
          </>
        )}
        {userAgent && (
          <>
            <h1>userAgent</h1>
            <h2>{userAgent}</h2>
          </>
        )}
      </main>
    </>
  );
};

// InitialExample.getInitialProps = ({ req }) => {
//   const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;

//   return {
//     userAgent,
//   };
// };

export const getStaticProps = async (ctx: NextPageContext) => {
  try {
    const singleCharacterApi = "https://rickandmortyapi.com/api/character/68";
    const character: any = await fetch(singleCharacterApi).then((res) =>
      res.json()
    );

    if (!character) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        character,
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default InitialExample;
