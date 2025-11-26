import { z } from "zod";

const schema = z.object({
    PORT: z.coerce.number().default(3000),
    MONGODB_URL: z.string(),
    MONGODB_DATABASE_NAME: z.string(),
});

let env;

try {
    env = schema.parse(process.env);
} catch (err) {
    console.error("Environment validation failed:", err.errors ?? err);
    throw err;
}

export { env };
