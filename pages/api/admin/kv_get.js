
export default async (req, res) => {
  console.log('params=', ctx.query);
  const {key} = ctx.query;

  console.log('key=', key);

  try {

    return res.send({status: "success", data: {key}});
  } catch(e) {
    console.log(e.stack);
    return res.send({status: "error", message: e.message});
  }

}
