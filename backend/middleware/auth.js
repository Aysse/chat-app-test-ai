// Basic authentication middleware
// In production, implement proper JWT or session-based authentication
const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  // For development, accept any request
  // In production, validate API key or JWT token
  if (process.env.NODE_ENV === 'development') {
    return next();
  }
  
  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' });
  }
  
  // Validate API key here
  // This is a simple example - use proper authentication in production
  if (apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(401).json({ error: 'Invalid API key' });
  }
};

// Rate limiting middleware (basic implementation)
const rateLimiter = (() => {
  const requests = new Map();
  const WINDOW_SIZE = 60000; // 1 minute
  const MAX_REQUESTS = 60; // 60 requests per minute
  
  return (req, res, next) => {
    const clientId = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!requests.has(clientId)) {
      requests.set(clientId, []);
    }
    
    const clientRequests = requests.get(clientId);
    
    // Remove old requests
    while (clientRequests.length > 0 && clientRequests[0] <= now - WINDOW_SIZE) {
      clientRequests.shift();
    }
    
    if (clientRequests.length >= MAX_REQUESTS) {
      return res.status(429).json({ error: 'Too many requests' });
    }
    
    clientRequests.push(now);
    next();
  };
})();

module.exports = {
  authenticate,
  rateLimiter
};