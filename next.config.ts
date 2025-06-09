// next.config.js
module.exports = {

  async headers() {
    return [
      {
        // Apply these headers to all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
        ],
      },
    ];
  },

  // remotePatterns in your next.config.js file to allow images from specific external paths and block all others
  // dokfkveanqiiqwlljlao.supabase.co

  //Supabase S3 Connection: Storage endpoint: https://dokfkveanqiiqwlljlao.supabase.co/storage/v1/s3

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dokfkveanqiiqwlljlao.supabase.co',
        pathname: '/storage/v1/object/sign/template-pics/**',
      },
    ],
  },
  

};


