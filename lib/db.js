import mysql from "serverless-mysql";
import fs from "fs";

// Load the CA certificate provided by Aiven
const caCert = `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUDNEBz0EGRS5cwRyGBqQuxIAbgewwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvNjZmMTZhMTgtN2QwNi00NTVhLTg0M2EtMmZlZjZmZTJi
NzNjIFByb2plY3QgQ0EwHhcNMjQwNTI0MDQwMDI4WhcNMzQwNTIyMDQwMDI4WjA6
MTgwNgYDVQQDDC82NmYxNmExOC03ZDA2LTQ1NWEtODQzYS0yZmVmNmZlMmI3M2Mg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAMPMzwWd
tBtKwhxVz0fmory1zg4Qy1FJocTi1iexOGDKsCdriqA+ZUxYh3YgccLlfALqGSSJ
fEzV4nRkCSmQl/0M9u6HOo9B0lSP9GoevHkWrr/G+rHYdXNRNoYB8ipNg236x6EF
rrM5t1h/GnnLSH/f9Ge1JUpfrOp5asla79WCKAk9htYr9F70mzIqonyZ9YSRaCLy
+EFtfOoxyN4XjyHu6B3ad6fqolIjaKle7lnist0NrS4mNcq9ub09ps9OcQDRJbLF
hiW0BUoVYSCDVnlUV4qV/+mKI2c0zhoh4I0gFH02C7/0M3o9VauOib16+s7Gne4u
CBa4thJXxo7Bf1gBZJ12T7ZzBTed+i9JvWCO99YdHTAU0PU+psZYeKXA3sMlbuRR
12MfAwxEQFVkSEoVw/83fgP3tWuyLSqLzsIOgBj5BadycS5Fzi3gOqkLwEV/uCuC
Yf+hhq1xsdP7IM3ODPdJp4GrT+OxyNwPeEfszeJRqt+bix9CoFcaQyATQwIDAQAB
oz8wPTAdBgNVHQ4EFgQUWAC4OYXJaHi+EfmEsNW7yjMKEgswDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAKl5aboiMO4ITu+J
oLVnVfhTAjXpsZhSeRR9hYS3dzbx8mqLT0oLTaehd5aZ3Fgy3SRqnA54Fpc5YN6W
D8SYVB+NRyzz/IpLh2ckZD/w0xYvydyROw2jHsLVFiqhHOi2+VZ+x7FTJCEQ8gzz
XrdIN25E+P1tBxvnLap0moNvwIRA3ihxVOWX3g5ukzsUafivJqvAbKnYY21QvYnk
TVXOUN5Y0oSJ5+vAamjVHWdmZXWIG6oYGLoeGTxQXUbvilkTDIAESW4mJoqVT0DQ
rXxQkZcbXSvCC6p1BzSKKTRIvp8K3lwVnwgxs4zJYOPt1/xJ+XrmGsVTcoR0wQ1h
4h+3LSvhQAKkGaMxoG62zUGzNqkwtYyJkRGIL87mBBMjP8v5KWD59Ys69YkMoyxm
j4dnGiKTNGDurtm7+P0GOInkss6BhcWHqOJA7OjUxmlHcs+vh/k2y93c3tBWz5TC
AaKTMzDGcMAqZRIYF1EYA9xs1NIGCEX0BJm6m3GkBKBA2YEMAg==
-----END CERTIFICATE-----`;

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
