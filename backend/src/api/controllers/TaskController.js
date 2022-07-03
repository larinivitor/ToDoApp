const Task = require("../models/Task");
const Project = require("../models/Project");

module.exports = {
  async find(req, res) {
    const { id: projectId } = req.params;
    const { id: userId } = req.userInfo;

    const project = await Project.findById(projectId);

    if (!project) {
      return res
        .status(400)
        .json({ status: 400, message: `Project not found` });
    }

    if (String(project.userId) !== userId) {
      return res.status(401).json({
        status: 401,
        message: `User can not get itens of the the Project ${projectId}`,
      });
    }

    const tasks = await Task.find({ projectId });

    return res.json(tasks);
  },

  async create(req, res) {
    const { id: projectId } = req.params;
    const { id: userId } = req.userInfo;
    const { name } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res
        .status(400)
        .json({ status: 400, message: `Project not found` });
    }

    if (String(project.userId) !== userId) {
      return res.status(401).json({
        status: 401,
        message: `User can not create tasks to the the Project ${projectId}`,
      });
    }

    const task = await Task.create({
      name,
      projectId: projectId,
      createdAt: new Date(),
    });

    return res
      .status(201)
      .json({ status: 201, message: "Task created successfully", task });
  },

  async deleteItem(req, res) {
    const { id: projectId, taskId } = req.params;
    const { id: userId } = req.userInfo;

    const project = await Project.findById(projectId);

    if (!project) {
      return res
        .status(400)
        .json({ status: 400, message: `Project not found` });
    }

    if (String(project.userId) !== userId) {
      return res.status(401).json({
        status: 401,
        message: `User can not delete tasks of the the List ${projectId}`,
      });
    }
    const deletedTask = await Task.findById(taskId);
    await Task.deleteOne({ _id: taskId });
    return res
      .status(200)
      .json({ status: 200, message: "Task deleted successfully", deletedTask });
  },

  async editItem(req, res) {
    const { id: projectId, taskId } = req.params;
    const { id: userId } = req.userInfo;

    const project = await Project.findById(projectId);

    if (!project) {
      return res
        .status(400)
        .json({ status: 400, message: `Project not found` });
    }

    if (String(project.userId) !== userId) {
      return res.status(401).json({
        status: 401,
        message: `User can not edit tasks of the the Project ${projectId}`,
      });
    }

    const task = await Task.findById(taskId);

    if (task.finished) {
      return res.status(401).json({
        status: 401,
        message: `User can not edit a finished task`,
      });
    }

    await Task.updateOne({ _id: taskId }, req.body);
    const newTask = await Task.findById(taskId);

    return res
      .status(200)
      .json({ status: 200, message: "Task edited successfully", newTask });
  },

  async finishItem(req, res) {
    const { id: projectId, taskId } = req.params;
    const { id: userId } = req.userInfo;

    const project = await Project.findById(projectId);

    if (!project) {
      return res
        .status(400)
        .send({ status: 400, message: `Project not found` });
    }

    if (String(project.userId) !== userId) {
      return res.status(401).send({
        status: 401,
        message: `User can not check tasks of the the Project ${projectId}`,
      });
    }

    await Task.updateOne(
      { _id: taskId },
      { finished: true, finishedAt: new Date() }
    );
    const newTask = await Task.findById(taskId);

    return res
      .status(200)
      .json({ status: 200, message: "Task checked successfully", newTask });
  },
};
