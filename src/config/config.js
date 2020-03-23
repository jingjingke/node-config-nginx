const config = {
  modules: {
    nginx: ["events", "http"],
    http: ["upstream", "server"],
    server: ["location"],
  },
  propertys: {
    nginx: ["worker_processes"],
    events: ["worker_connections"],
    upstream: ["server"],
    http: ["include", "default_type", "sendfile", "keepalive_timeout"],
    server: ["listen", "server_name"],
    location: ["root", "index", "add_header", "expires", "proxy_pass"],
  },
  especial: {
    server: 1,
    upstream: 2,
    location: 2,
  },
  complex: ["server"],
  repeatable: ["server", "add_header"],
};
export default config;
