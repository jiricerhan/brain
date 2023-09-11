import { existsSync, readFileSync } from "fs";
import { GetServerSideProps } from "next";
import { resolve } from "path";

// Serve dynamically generate chart files since next won't serve them
export const getServerSideProps: GetServerSideProps = async (context) => {
  const name = typeof context?.params?.id === "string" ? context.params.id : null;
  if (!name) return { notFound: true, props: {} };

  const filePath = resolve(process.cwd(), "./public/charts/", name);

  const fileExists = existsSync(filePath);
  if (fileExists) {
    const file = readFileSync(filePath, "utf8");
    context.res.setHeader("Content-Type", "image/svg+xml");
    context.res.end(file);
    return {
      props: {
        dummy: true,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};

export default function Chart() {
  return <div>dummy</div>;
}
