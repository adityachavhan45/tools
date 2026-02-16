export async function POST(req) {

  const body = await req.json();

  const data = {
    ...body,
    token: process.env.SECRET_TOKEN,
  };

  await fetch(process.env.APPS_SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return Response.json({ status: "success" });
}
