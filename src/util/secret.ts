import dotenv from "dotenv";
import fs from "fs";

console.log("salut")
if (fs.existsSync(".env")) {
    dotenv.config({ path: ".env" });
} else {
    dotenv.config({ path: ".env.example" });
}