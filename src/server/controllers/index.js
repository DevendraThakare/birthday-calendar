function homePage(req, res) {
  return res.render("homePage", { title: "Hey", message: "Hello there!" });
}

export default { homePage };
