import cors from 'cors';

const corsOptions = {
  origin(_origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // For now lets allow any URL
    callback(null, true);
  },
  methods: ['PATCH', 'GET', 'POST', 'HEAD', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

export default cors(corsOptions);
