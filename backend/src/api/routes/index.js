const express = require("express");
const { verifyJWT } = require("../middleware");
const UserController = require("../controllers/UserController");
const ProjectController = require("../controllers/ProjectController");
const TaskController = require("../controllers/TaskController");

const routes = new express.Router();

routes.post("/api/signup", UserController.create);
routes.post("/api/login", UserController.login);

routes.get("/api/projects", verifyJWT, ProjectController.find);
routes.post("/api/projects", verifyJWT, ProjectController.create);

routes.get("/api/projects/:id", verifyJWT, ProjectController.findOne);
routes.delete("/api/projects/:id", verifyJWT, ProjectController.delete);
routes.patch("/api/projects/:id", verifyJWT, ProjectController.update);

routes.get("/api/projects/:id/tasks", verifyJWT, TaskController.find);
routes.post("/api/projects/:id/tasks", verifyJWT, TaskController.create);

routes.delete(
  "/api/projects/:id/tasks/:taskId",
  verifyJWT,
  TaskController.deleteItem
);
routes.patch(
  "/api/projects/:id/tasks/:taskId",
  verifyJWT,
  TaskController.editItem
);

routes.post(
  "/api/projects/:id/tasks/:taskId/finish",
  verifyJWT,
  TaskController.finishItem
);

module.exports = routes;
