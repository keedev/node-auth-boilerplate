// export const JWT_SECRET = process.env["JWT_SECRET"];

//todo
export const JWT_SECRET = "123";

if (!JWT_SECRET) {
    console.log("No JWT secret string. Set JWT_SECRET environment variable.");
    process.exit(1);
}