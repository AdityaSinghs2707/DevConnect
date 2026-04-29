const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

// 1. Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 2. EJS Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 3. Static files
app.use(express.static(path.join(__dirname, 'public')));

// 4. Import Routes (Ek hi baar karna hai!)
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const viewRoutes = require('./routes/viewRoutes'); // Isse bhi yahi upar le aao

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/', viewRoutes);

// 6. 404 Handler
app.use((req, res) => {
  res.status(404).send('Page nahi mila! 😅');
});

module.exports = app;