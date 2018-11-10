module.exports = (app) => {
    app.get('/', (req, res) => {
        res.sendFile('./home.html', {root: __dirname});
    });
}