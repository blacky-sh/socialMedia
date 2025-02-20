const checkRestrictions = (req, res, next) => {
  if (req.user.isBanned) {
    if (req.user.banExpires && new Date() > req.user.banExpires) {
      req.user.isBanned = false;
      req.user.banExpires = null;
      req.user.save();
    } else {
      return res.status(403).json({ error: "User is banned" });
    }
  }

  if (req.user.isRestrictedFromPosting) {
    if (
      req.user.postRestrictionExpires &&
      new Date() > req.user.postRestrictionExpires
    ) {
      req.user.isRestrictedFromPosting = false;
      req.user.postRestrictionExpires = null;
      req.user.save();
    } else if (req.method === "POST" && req.path.includes("/posts")) {
      return res.status(403).json({ error: "User is restricted from posting" });
    }
  }

  next();
};

export default checkRestrictions;
