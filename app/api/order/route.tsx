export async function POST(req: Request) {

  const body = await req.json()

  await fetch("https://script.google.com/macros/s/AKfycbze0GCprZG8AnXpG8AJmaQCEsFVcfLyxVQA1LPjNdKD_orPp3dK7q85531CnxU8alhLmg/exec", {
    method: "POST",
    body: JSON.stringify(body)
  })

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" }
  })
}


export async function GET() {

  const res = await fetch(
    "https://script.google.com/macros/s/AKfycbze0GCprZG8AnXpG8AJmaQCEsFVcfLyxVQA1LPjNdKD_orPp3dK7q85531CnxU8alhLmg/exec",
    { method: "GET" }
  )

  const data = await res.json()

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  })
}