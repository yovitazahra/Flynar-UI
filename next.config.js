/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    REST_API_ENDPOINT: 'http://localhost:8000/api/v1/'
  }
}

module.exports = nextConfig
