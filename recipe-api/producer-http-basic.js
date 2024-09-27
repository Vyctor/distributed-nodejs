const fastify = require("fastify")({
  logger: true,
});

console.log(`worker pid=${process.pid}`);

fastify.get("/recipes/:id", async (req, reply) => {
  console.log(`worker request pid=${process.pid}`);
  const id = Number(req.params.id);
  if (id !== 42) {
    reply.statusCode = 404;
    return { error: "not_found" };
  }
  return {
    producer_pid: process.pid,
    recipe: {
      id,
      name: "Chichen Tikka Masala",
      steps: "Throw it in a pot",
      ingredients: [
        { id: 1, name: "Chichen Tikka Masala", quantity: "1 lb" },
        { id: 2, name: "Sauce", quantity: "2 cups" },
      ],
    },
  };
});

fastify.listen({ port: 4000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Producer running at ${address}`);
});
