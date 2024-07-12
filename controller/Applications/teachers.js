const express = require("express");
const TeacApp = require("../../model/Applications/teachers");
const router = express.Router();

router.post("/teacNewApp", async (req, res) => {
  const { name, email, phone, address, subject } = req.body;

  try {
    const teacApp = new TeacApp({
      name,
      email,
      phone,
      address,
      subject,
    });

    await teacApp.save();

    return res
      .status(200)
      .json({ msg: "Application sent successfully", teacApp });
  } catch (error) {
    console.log("Eoor while post application", error);
    return res.status(400).json({ msg: "Error while post application" });
  }
});

router.get("/teacApp", async (req, res) => {
  try {
    const teacApp = await TeacApp.find();

    if (teacApp.length == 0) {
      console.log("No data found");
      return res.status(404).json({ msg: "No data found" });
    }

    return res.status(201).json({ msg: "Teachers application", teacApp });
  } catch (error) {
    console.log("Eoor while fetching application", error);
    return res.status(404).json({ msg: "Error while fetching application" });
  }
});

router.get("/teacApp/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const teacApp = await TeacApp.findById(id);

    if (!teacApp) {
      console.log("No data found in this id");
      return res.status(404).json({ msg: "No data found in this id" });
    }

    return res.status(201).json({ msg: "Teacher application", teacApp });
  } catch (error) {
    console.log("Eoor while fetching application", error);
    return res.status(404).json({ msg: "Error while fetching application" });
  }
});

router.put("/teacAppUpdate/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const teacApp = await TeacApp.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(201).json({ msg: "Updated successfull", teacApp });
  } catch (error) {
    console.log("Eoor while update application", error);
    return res.status(500).json({ msg: "Error while update application" });
  }
});

router.delete("/teacAppDelete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const teacApp = await TeacApp.findByIdAndDelete(id);

    return res.status(201).json({ msg: "Deleted successfully", teacApp });
  } catch (error) {
    console.log("Eoor while update application", error);
    return res.status(500).json({ msg: "Error while update application" });
  }
});

module.exports = router;
