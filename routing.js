module.exports = (app) => {
    app.get('/', (req, res) => {
        res.sendFile('./home.html', {root: __dirname});
    });

    app.get('/pokemon/:id', (req, res) => {
        res.sendFile('./profile.html', {root: __dirname});
    });

    app.get('/gen/:num', (req, res) => {
        res.sendFile('./generation.html', {root: __dirname});
    })
}