// Import required modules
const http = require("http");
const fs = require("fs");
const path = require("path");

// Define the port
const PORT = 3000;

// Helper function to serve HTML files
const serveFile = (res, filePath, statusCode = 200) =>
{
    fs.readFile(filePath, (err, data) =>
    {
        if (err)
        {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("500 - Internal Server Error");
        } else
        {
            res.writeHead(statusCode, { "Content-Type": "text/html" });
            res.end(data);
        }
    });
};

// Create the server
const server = http.createServer((req, res) =>
{
    // Handle CSS file
    if (req.url === "/style.css")
    {
        const cssPath = path.join(__dirname, "public", "style.css");
        fs.readFile(cssPath, (err, data) =>
        {
            if (err)
            {
                res.writeHead(500);
                res.end();
            } else
            {
                res.writeHead(200, { "Content-Type": "text/css" });
                res.end(data);
            }
        });
        return;
    }

    // Routing
    switch (req.url)
    {
        case "/":
        case "/home":
            serveFile(res, path.join(__dirname, "pages", "homepage.html"));
            break;

        case "/about":
            serveFile(res, path.join(__dirname, "pages", "aboutpage.html"));
            break;

        case "/contact":
            serveFile(res, path.join(__dirname, "pages", "contactpage.html"));
            break;

        default:
            serveFile(
                res,
                path.join(__dirname, "pages", "404page.html"),
                404
            );
    }
});

// Start the server
server.listen(PORT, () =>
{
    console.log(`Server is running at http://localhost:${PORT}`);
});
