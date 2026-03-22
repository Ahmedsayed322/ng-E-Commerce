export default async (req, res) => {
  const { reqHandler } = await import('../dist/e-commerce/server/server.mjs');
  return reqHandler(req, res);
};
