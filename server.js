const express = require('express');

const app = express();

// Put CORS here if needed

/*
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
*/

const PORT = process.env.PORT || 5000;

// Serve static assets in production
app.use(express.static('client'));
/*
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}
*/

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
