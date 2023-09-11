import Link from "next/link";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <p>
        This project was created for a brain interview. It is a simple app build
        using <i>NextJS</i>, <i>DynamoDB</i> to create a{" "}
        <Link href="/dashboard">dashboard</Link> with svg chart that updates in
        real time. And an <Link href="/admin">admin</Link> page where you can
        add new data to the database. database.
      </p>
      <h2>Used technologies</h2>
      <ul>
        <li>TypeScript</li>
        <li>NextJS</li>
        <li>DynamoDB</li>
        <li>Graphql</li>
        <li>Graphql code generator</li>
        <li>Server events API</li>
        <li>Docker</li>
        <li>Docker compose</li>
        <li>CSS modules</li>
        <li>Open Props</li>
      </ul>
      <h2>Project features and challenges</h2>
      <h3>Real time chart updates</h3>
      <p>
        Real time chart updates is done using{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events">
          server events API
        </a>
        . When data was update from the admin page, the server sends a message
        to the client to update the chart via dataset API route.
      </p>
      <h3>No JS charts</h3>
      <p>
        The chart is created using only svg. It is not a library, but a simple
        svg element that is crated and saved when new data is received. This
        allows using 0 js on the client side and effectively caching the chart
        resource.
      </p>
      <h3>Fully typed graphql</h3>
      <p>
        The graphql schema is fully typed using{" "}
        <a href="https://graphql-code-generator.com/">graphql code generator</a>
        . This allows for type safety when using graphql queries and mutations.
      </p>
      <h3>Components container patter</h3>
      <p>
        The components are created using container pattern. This allows for
        better separation of concerns, easier testing and simple performance
        optimization.
      </p>
      <h3>🐳 Dockerized dev environment</h3>
      <p>
        The project is dockerized. This allows for easy development and
        deployment. Plus it ensures that the dev environment is the same for all
        deves 👨‍💻 and the same as the production environment.
      </p>
    </>
  );
};

export default Home;
