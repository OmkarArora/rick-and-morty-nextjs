import Image from "next/image";
import { Character, GetCharacterResults } from "../../types";
import imageLoader from "../../imageLoader";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import styles from "../../styles/Character.module.css";

function CharacterPage({ character }: { character: Character }) {
  const router = useRouter();
  console.log(router.query);
  return (
    <div className={styles.container}>
      <h1>
        <Image
          loader={imageLoader}
          unoptimized
          src={character.image}
          alt={character.name}
          width="200"
          height="200"
        />
        {character.name}
      </h1>
    </div>
  );
}

CharacterPage.getLayout = function getLayout(page: typeof CharacterPage) {
  return <Layout>{page}</Layout>;
};

// export async function getStaticPaths() {
//   const res = await fetch("https://rickandmortyapi.com/api/character");
//   let { results }: GetCharacterResults = await res.json();

//   return {
//     paths: results.map((character) => {
//       return {
//         params: { id: String(character.id) },
//       };
//     }),
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params }: { params: { id: string } }) {
//   const res = await fetch(
//     `https://rickandmortyapi.com/api/character/${params.id}`
//   );

//   const character = await res.json();
//   return {
//     props: {
//       character,
//     },
//   };
// }

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${context.query.id}`
  );

  const character = await res.json();
  return {
    props: {
      character,
    },
  };
};

export default CharacterPage;
