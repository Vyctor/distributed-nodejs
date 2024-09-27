const fastify = require("fastify")({
  logger: true,
});

const TARGET = "http://localhost:4000";

fastify.get("/", async () => {
  const request = await fetch(`${TARGET}/recipes/42`);
  const producer_data = await request.json();
  return {
    consumer_pid: process.pid,
    producer_data,
  };
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Producer running at ${address}`);
});
