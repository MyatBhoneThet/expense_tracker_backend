// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');

// // Load environment variables
// dotenv.config();

// // Connect to database
// connectDB();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/income', require('./routes/incomeRoutes'));
// app.use('/api/expenses', require('./routes/expenseRoutes'));

// // Test route
// app.get('/', (req, res) => {
//   res.json({ message: 'Finance Tracker API is running' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// ✅ FIXED CORS CONFIGURATION - Replace the simple app.use(cors()) with this:
const allowedOrigins = [
  'http://localhost:3000',           // React dev server
  'http://localhost:5173',           // Vite dev server
  process.env.FRONTEND_URL,          // Your Vercel URL from environment variable
  'https://*.vercel.app'             // Allow all Vercel subdomains
].filter(Boolean); // Remove any undefined values

app.use(cors({
  origin: function (origin, callback) {
    console.log('🔍 Request from origin:', origin); // Debug log
    
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin.includes('*')) {
        // Handle wildcard domains like *.vercel.app
        const regex = new RegExp(allowedOrigin.replace('*', '.*'));
        return regex.test(origin);
      }
      return allowedOrigin === origin;
    });
    
    if (isAllowed) {
      return callback(null, true);
    }
    
    console.error('❌ CORS blocked origin:', origin);
    const msg = `CORS policy does not allow access from origin: ${origin}`;
    return callback(new Error(msg), false);
  },
  credentials: true, // Important for JWT tokens in cookies/headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/income', require('./routes/incomeRoutes'));
app.use('/api/expense', require('./routes/expenseRoutes'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Finance Tracker API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
