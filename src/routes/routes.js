import userRoutes from '../routes/user';



export const initRoutes = app => {
    app.get('/test', (req, res) => { 
        res.send('Testing out the initroutes function')
    });
    app.use('/api/v1/user', userRoutes);
}