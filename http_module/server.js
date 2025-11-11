import http from "http";

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    switch (req.url) {
        case "/":
            res.statusCode = 200;
            res.end("I am Retesh Kumar Sharma!");
            break;

        case "/source-code":
            res.statusCode = 200;
            res.end("Happy Diwali 🎆");
            break;

        case "/contact":
            res.statusCode = 200;
            res.end("Have a Project or want to Collaborate?");
            break;

        default:
            res.statusCode = 404;
            res.end("404 - Page Not Found");
    }
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/`);
});










