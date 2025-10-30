import Task from "../models/Tasks.js";

export const getAllTasks = async (req, res) => {
  const { filter = "today" } = req.query;
  const nowDate = new Date();
  let startDate;

  switch (filter) {
    case "today": {
      startDate = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth(),
        nowDate.getDate()
      );
      break;
    }
    case "week": {
      const monday =
        nowDate.getDate() -
        (nowDate.getDay() - 1) -
        (nowDate.getDay() === 0 ? 7 : 0);
      startDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), monday);
      break;
    }
    case "month": {
      startDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1);
    }
    default: {
      startDate = null;
    }
  }

  const query = startDate ? { createdAt: { $gte: startDate } } : {};

  try {
    // const tasks = (await Task.find()).reverse();
    const result = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completeCount: [
            { $match: { status: "complete" } },
            { $count: "count" },
          ],
        },
      },
    ]);
    res.status(200).json(result);
  } catch (error) {
    console.error("getAllTasks", error);
    res.status(500).json({ message: "loi he thong" });
  }
};

export const createTasks = async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ title });
    const newTask = await task.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.error("createTasks", error);
    res.status(500).json({ message: "loi he thong" });
  }
};

export const updateTasks = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updatedTasks = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        completedAt,
      },
      { new: true }
    );

    if (!updatedTasks) {
      return res.status(404).json({ messsage: "khong ton tai" });
    }

    res.status(200).json(updatedTasks);
  } catch (error) {
    console.error("updateTasks", error);
    res.status(500).json({ message: "loi he thong" });
  }
};

export const deleteTasks = async (req, res) => {
  try {
    const delelte = await Task.findByIdAndDelete(req.params.id);

    if (!delelte) {
      return res.status(404).json({ messsage: "khong ton tai" });
    }

    res.status(200).json(delelte);
  } catch (error) {
    console.error("deleteTasks", error);
    res.status(500).json({ message: "loi he thong" });
  }
};
