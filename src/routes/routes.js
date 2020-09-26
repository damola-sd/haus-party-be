import userRoutes from '../routes/user';
import eventRouters from '../routes/event';
// import cardRouters from '../routes/card';
import feedbackRouters from '../routes/feedback';





export const initRoutes = app => {
    app.get('/test', (req, res) => { 
        res.send('Testing out the initroutes function')
    });
    app.use('/api/v1/user', userRoutes);
    app.use('/api/v1/event', userRoutes);
    app.use('/api/v1/card', userRoutes);
    app.use('/api/v1/feedback', feedbackRouters);

    


}