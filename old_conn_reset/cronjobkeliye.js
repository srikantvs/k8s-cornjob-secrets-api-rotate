import got from "got"

console.log("Hello")
const url = "https://google.com:81"

try {
  const response = await got(url, {
    timeout: {
      lookup: 2000,    // DNS resolution timeout
      request: 3000    // Total request timeout
    },
    retry: {
      limit: 0         // Disable retrying on failure
    }
  })
  console.log(response.statusCode, Math.random() * 1000);
} catch (err) {
  console.error("❌ Request failed:", err.code || err.message);
  throw err;
}
