const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000


app.get('/', (req, res) => {
    res.send('All working')
})



// Routes

const hotelsRouter = require('./routes/hotels/hotels');
app.use('/hotels', hotelsRouter);


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})