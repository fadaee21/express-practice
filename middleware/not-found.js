const notFound = (_req, res) => res.status(404).send({ message: "Not Found" });
module.exports = { notFound };
