require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: function(origin, callback){
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth',     require('./routes/auth'));
app.use('/api/user',     require('./routes/user'));
app.use('/api/meals',    require('./routes/meals'));
app.use('/api/craving',  require('./routes/craving'));
app.use('/api/plan',     require('./routes/plan'));
app.use('/api/nudge',    require('./routes/nudge'));
app.use('/api/feedback', require('./routes/feedback'));

app.get('/', (req, res) => res.json({ status: 'NutriSense API running 🌿' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌿 NutriSense backend running on http://localhost:${PORT}`);
});
