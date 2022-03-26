import Image from "next/image";
import { Character, GetCharacterResults } from "../../types";
import imageLoader from "../../imageLoader";
import Link from "next/link";

function CharacterPage({ character }: { character: Character }) {
  return (
    <div>
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
      <Link href="/">
        <a>← Back to home</a>
      </Link>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  let { results }: GetCharacterResults = await res.json();

  return {
    paths: results.map((character) => {
      return {
        params: { id: String(character.id) },
      };
    }),
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${params.id}`
  );

  const character = await res.json();
  return {
    props: {
      character,
    },
  };
}

export default CharacterPage;
