module.exports = {
  apps: [
    {
      name: "ihd-api",
      script: "dist/server.js",
      cwd: "/var/www/api.treks.indiaholidaydestination.com/app",
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
      },
      error_file: "/var/www/api.treks.indiaholidaydestination.com/logs/error.log",
      out_file: "/var/www/api.treks.indiaholidaydestination.com/logs/out.log",
      merge_logs: true,
      time: true,
      autorestart: true,
      watch: false,
    },
  ],
};
