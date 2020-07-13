const fs = require("fs");
const https = require("https");
const file__svg = fs.readFileSync("static/functions/man.svg", { encoding: "utf-8" });

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    const email_md5 = event.queryStringParameters.email || "sbdfbsdf";
    const gravatar_resp = await get_req(email_md5);

    if (gravatar_resp.statusCode === 404) {
      return {
        statusCode: 200,
        body: file__svg,
        headers: { "Content-Type": "image/svg+xml" }
      };
    } else {
      return {
        statusCode: 200,
        body: "cool shit",
        headers: { "Content-Type": "text/html" }
      };
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};

function get_req(md5email) {
  return new Promise((resolve, reject) => {
    let statusCode = null;
    let data = "";
    const options = {
      hostname: "gravatar.com",
      port: 443,
      path: "/avatar/" + md5email,
      method: "GET"
    };

    const req = https.request(options, res => {
      statusCode = res.statusCode;

      res.on("data", d => {
        data += d;
      });
    });

    res.on("end", () => resolve({ statusCode, data }));

    req.on("error", error => {
      reject(error);
    });

    req.end();
  });
}
