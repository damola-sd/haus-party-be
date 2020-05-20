



export const initRoutes = app => {
    app.get('/test', (req, res) => { 
        res.send('Testing out the initroutes function')
    });
}