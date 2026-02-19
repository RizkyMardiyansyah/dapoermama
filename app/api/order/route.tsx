export async function POST(req: Request) {

    const body = await req.json()
  
    await fetch("https://script.google.com/macros/s/AKfycbxg3519xte72ifY4-FjD0P676G-Uwia5g9CVjMDDt6Q6qj7fG2nW9e0zN2uJyXz9EpKwA/exec", {
      method: "POST",
      body: JSON.stringify(body)
    })
  
    return new Response(JSON.stringify({ success: true }))
  }
  
