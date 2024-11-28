module.exports = {
    apps: [
      {
        name: "nginx",
        script: "/usr/sbin/nginx",
        args: "-g 'daemon off;'",
        exec_mode: "fork",
        autorestart: true,
        watch: false,
        max_restarts: 10,
      },
    ],
  };
  