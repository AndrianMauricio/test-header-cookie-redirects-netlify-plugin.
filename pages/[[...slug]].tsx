import type { GetStaticProps, NextPage } from "next";
import { ALL_LANGUAGE_CODES } from "../lib/i18n";

interface HomePageProps {
  path: string[];
  locale: string;
}

const Home: NextPage<HomePageProps> = props => {
  return (
    <div>
      Path: {props.path}
      <br />
      Locale: {props.locale}
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps, { slug: string[] }> = context => {
  return {
    props: {
      locale: context.locale || "default",
      path: context.params?.slug || ["/"],
    },
  };
};

export async function getStaticPaths() {
  const paths = ["/path", "/path/sub-path", "/destination"].reduce((result, path) => {
    ALL_LANGUAGE_CODES.forEach(locale =>
      result.push({ params: { slug: path.split("/").slice(1) }, locale }),
    );
    return result;
  }, [] as Array<{ params: { slug: string[] }; locale: string }>);

  return { paths, fallback: "blocking" };
}

export default Home;
