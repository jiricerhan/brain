import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

// Serve dynamically generate chart files since next won't serve them
export async function getServerSideProps(context: any) { // TODO type
  const filePath = resolve(
    process.cwd(),
    "./public/charts/",
    context.params.id
  );

  const fileExists = existsSync(filePath);

  if (fileExists) {
    const file = readFileSync(filePath, "utf8");
    context.res.setHeader("Content-Type", "image/svg+xml");
    context.res.end(file);
    return {
      props: {},
    };
  } else {
    return {
      notFound: true,
    };
  }
}

export default function Chart() {
  return <div>dummy</div>;
}
