import mysql from "serverless-mysql";
import fs from "fs";

// Load the CA certificate provided by Aiven
const caCert = fs.readFileSync("ca.pem");

const db = mysql({
  config: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
      ca: caCert, // Provide the CA certificate
      rejectUnauthorized: true, // Enable server certificate verification
    },
  },
});

export default async function excuteQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    console.error("Database Error:", error);
    return { error };
  }
}
