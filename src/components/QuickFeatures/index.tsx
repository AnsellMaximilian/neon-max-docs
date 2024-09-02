import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import { BsDatabase } from "react-icons/bs";
import { IconType } from "react-icons";
import { RiNextjsFill } from "react-icons/ri";
import { BiLock } from "react-icons/bi";
import { AiOutlineIdcard } from "react-icons/ai";
import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { HiOutlineCommandLine } from "react-icons/hi2";

type FeatureItem = {
  id: string;

  icon: IconType;
  title: string;
  content: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    id: "neon",
    icon: BsDatabase,
    title: "Neon Database",
    content: (
      <>
        <p>
          Neon Max is powered by Neon&apos;s Serverless Postgres Database. Head
          over to{" "}
          <a href="https://neon.tech/" target="_blank">
            Neon
          </a>{" "}
          and provide your serverless database URL string to the{" "}
          <code>.env</code> file.
        </p>

        <Highlight
          theme={themes.shadesOfPurple}
          code={`DATABASE_URL="postgresql://<user>:<password>@<endpoint_hostname>.neon.tech:<port>/<dbname>?sslmode=require"`}
          language="bash"
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <span style={{ marginRight: "1.25rem" }}>{i + 1}</span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>

        <p>
          While Neon Max uses Prisma as a database ORM, you can still use Neon
          to execute raw queries for limitless flexibility:
        </p>

        <Highlight
          theme={themes.shadesOfPurple}
          code={`import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
const response = await sql\`SELECT version()\`;`}
          language="typescript"
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <span style={{ marginRight: "1.25rem" }}>{i + 1}</span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </>
    ),
  },
  {
    id: "nextjs",
    title: "Next.js",
    icon: RiNextjsFill,
    content: (
      <>
        <p>
          Our Next.js Starter Kit is a powerful and flexible foundation for
          building modern web applications using the latest Next.js features.
          Leveraging the Next.js App Router, this starter kit provides all the
          capabilities of Next.js.
        </p>

        <p>
          This means you can easily deploy Neon Max to{" "}
          <a href="https://vercel.com/">Vercel</a> just as easily as any Next.js
          application.
        </p>
      </>
    ),
  },
  {
    id: "authentication",
    title: "Authentication",
    icon: BiLock,
    content: (
      <>
        <p>
          Neon Max comes shipped with a working authentication system using{" "}
          <strong>Next Auth</strong>.
        </p>

        <p>
          Simply generate an auth secret and insert it to your <code>.env</code>{" "}
          file for <code>AUTH_SECRET</code>
        </p>
        <Highlight
          theme={themes.shadesOfPurple}
          code={`npx auth secret --raw`}
          language="bash"
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <span style={{ marginRight: "1.25rem" }}>{i + 1}</span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>

        <p>
          Neon Max also comes with a the <code>Auth</code> helper class to
          simplify your authentication flow even more.{" "}
          <code>Auth.authenticated()</code> and <code>Auth.guest()</code> can be
          used limit access to authenticated users and guests, respectively.
        </p>

        <Highlight
          theme={themes.shadesOfPurple}
          code={`// protect pages against unauthenticated users
await Auth.authenticated();

// only allow guests to view pages
await Auth.guest();`}
          language="typescript"
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <span style={{ marginRight: "1.25rem" }}>{i + 1}</span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </>
    ),
  },
  {
    id: "authorization",
    title: "Authorization",
    icon: AiOutlineIdcard,
    content: (
      <>
        <p>
          Beyond authentication, you might also need even finer control of who
          can access what and who can't. Neon Max also provides a helper{" "}
          <code>Authorization</code> class for this.
        </p>

        <p>
          Firstly, define a policy inside <code>config/authorization.ts</code>:
        </p>
        <Highlight
          theme={themes.shadesOfPurple}
          code={`// define a policy
export const AUTHORIZATIONS = {
  "can-edit-blog": async (user) => {
    const blog = await getBlogById(blogId);

    return blog.authorId === user.id;
  },

  // other policies

};`}
          language="typescript"
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <span style={{ marginRight: "1.25rem" }}>{i + 1}</span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>

        <p>
          Then, use <code>Authorization.allows()</code> to determine if the
          currently authenticated user can pass the provided policy:
        </p>

        <Highlight
          theme={themes.shadesOfPurple}
          code={`{
    (await Authorization.allows("can-edit-blog", blogId)) && (
        <button>Edit Button</button>
    )
}`}
          language="tsx"
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <span style={{ marginRight: "1.25rem" }}>{i + 1}</span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
        <p>
          The example above shows how you can conditionally render an element
          based on whether or not the current user passes a policy check.
        </p>
      </>
    ),
  },
  {
    id: "neon-max-cli",
    title: "Neon Max CLI",
    icon: HiOutlineCommandLine,
    content: (
      <>
        <p>
          Neon Max has an associated CLI tool called Neon Max CLI. You can use
          this tool to initialize a Neon Max Project:
        </p>

        <Highlight
          theme={themes.shadesOfPurple}
          code={`npx neon-max-cli init project-name`}
          language="bash"
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <span style={{ marginRight: "1.25rem" }}>{i + 1}</span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>

        <p>
          Once you have initialized a Neon Max project, you can use Neon Max CLI
          again to generate models:
        </p>

        <Highlight
          theme={themes.shadesOfPurple}
          code={`npx neonmax generate:model ModelName -a`}
          language="bash"
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <span style={{ marginRight: "1.25rem" }}>{i + 1}</span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
        <p>
          This command will generate a new model within your{" "}
          <code>prisma/schema.prisma</code> file, ready for you to sync with
          your Neon database.
        </p>
        <p>
          The <code>-a</code> flag also generated associated CRUD actions inside
          your <code>actions/modelName.ts</code> file, ready for you to use.
        </p>
      </>
    ),
  },
];

function Feature({ title, content }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{content}</p>
      </div>
    </div>
  );
}

export default function QuickFeatures(): JSX.Element {
  const [selectedFeatureId, setSelectedFeatureId] = useState(FeatureList[0].id);
  const selectedFeature = FeatureList.find((f) => f.id === selectedFeatureId)!;
  return (
    <section className={styles.features}>
      <div className={clsx("container")}>
        <div className={styles.featureContainer}>
          <div className={clsx(styles.tab)}>
            {FeatureList.map((f) => {
              return (
                <div
                  key={f.id}
                  className={clsx(
                    styles.tabItem,
                    selectedFeatureId === f.id && styles.tabItemSelected
                  )}
                  onClick={() => setSelectedFeatureId(f.id)}
                >
                  <f.icon /> <div className={styles.tabTitle}>{f.title}</div>
                </div>
              );
            })}
          </div>
          <div className={clsx(styles.tabContent)}>
            {selectedFeature.content}
          </div>
        </div>
      </div>
    </section>
  );
}
