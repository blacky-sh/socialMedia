import Report from "../models/reportModel.js";

const reportUser = async (req, res) => {
  try {
    const { reportedUser, reason } = req.body;
    const report = new Report({
      reportedBy: req.user._id,
      reportedUser,
      reason,
    });
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const reportPost = async (req, res) => {
  try {
    const { reportedPost, reason } = req.body;
    const report = new Report({
      reportedBy: req.user._id,
      reportedPost,
      reason,
    });
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeReport = async (req, res) => {
  try {
    const { postId } = req.params;
    await Report.findOneAndDelete({ reportedPost: postId });
    res.status(200).json({ message: "Report removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getReports = async (req, res) => {
  try {
    const reports = await Report.find().populate(
      "reportedBy reportedUser reportedPost"
    );
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateReportStatus = async (req, res) => {
  try {
    const { status, action, duration } = req.body;
    const report = await Report.findById(req.params.id).populate(
      "reportedUser reportedPost"
    );

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    if (action === "banUser") {
      report.reportedUser.isBanned = true;
      report.reportedUser.banExpires = duration
        ? new Date(Date.now() + duration * 24 * 60 * 60 * 1000)
        : null;
      await report.reportedUser.save();
    } else if (action === "restrictPosting") {
      report.reportedUser.isRestrictedFromPosting = true;
      report.reportedUser.postRestrictionExpires = duration
        ? new Date(Date.now() + duration * 24 * 60 * 60 * 1000)
        : null;
      await report.reportedUser.save();
    } else if (action === "markNormal") {
      // No action needed, just update the report status
    }

    report.status = status;
    await report.save();

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markPostAsSafe = async (req, res) => {
  try {
    const { postId } = req.params;
    await Report.findOneAndDelete({ reportedPost: postId });
    res
      .status(200)
      .json({ message: "Post marked as safe and report removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const markUserAsSafe = async (req, res) => {
  try {
    const { userId } = req.params;
    await Report.findOneAndDelete({ reportedUser: userId });
    res
      .status(200)
      .json({ message: "User marked as safe and report removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export {
  reportUser,
  reportPost,
  getReports,
  updateReportStatus,
  removeReport,
  markPostAsSafe,
  markUserAsSafe,
};
