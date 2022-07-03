const Project = require("../models/Project");

module.exports = {
  async create(req, res) {
    const { name } = req.body;
    const { id } = req.userInfo;

    if (!name)
      return res
        .status(400)
        .json({ status: 400, message: "Project name can not be empty" });

    const project = await Project.create({
      name,
      userId: id,
    });

    return res
      .status(201)
      .json({ status: 201, message: "Project created successfully", project });
  },

  async find(req, res) {
    const { id } = req.userInfo;
    const projects = await Project.find({ userId: id });

    return res.json(projects);
  },

  async findOne(req, res) {
    const { id: userId } = req.userInfo;
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res
        .status(400)
        .json({ status: 400, message: `Project not found` });
    }

    if (String(project.userId) !== userId) {
      return res.status(401).json({
        status: 401,
        message: `User can not access the Project ${id}`,
      });
    }

    return res.json(project);
  },

  async delete(req, res) {
    const { id: userId } = req.userInfo;
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res
        .status(400)
        .json({ status: 400, message: `Project not found` });
    }

    if (String(project.userId) !== userId) {
      return res.status(401).json({
        status: 401,
        message: `User can not delete the Project ${id}`,
      });
    }

    await Project.deleteOne({ _id: id });
    return res
      .status(200)
      .json({ status: 200, message: "Project deleted successfully", project });
  },

  async update(req, res) {
    const { id: userId } = req.userInfo;
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res
        .status(400)
        .json({ status: 400, message: `Project not found` });
    }

    if (String(project.userId) !== userId) {
      return res
        .status(401)
        .json({ status: 401, message: `User can not edit the Project ${id}` });
    }

    await Project.updateOne({ _id: id }, req.body);
    const { name, _id } = await Project.findById(id);

    return res.json({
      status: 200,
      message: "Project edited successfully",
      project: { _id, name},
    });
  },
};
