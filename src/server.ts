import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import z from "zod";

const app = fastify();
const prisma = new PrismaClient({
  log: ["query"],
});

app.post("/events", (request, reply) => {
  const createEventSchema = z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maximumAttendees: z.number().int().nullable(),
  });

  const { details, maximumAttendees, title } = createEventSchema.parse(
    request.body
  );

  prisma.event.create({
    data: {
      title,
      maximumAttendees,
      details,
      slug: "dddd",
    },
  });
});

app.listen({ port: 3333 }).then(() => {
  console.log("server running");
});
