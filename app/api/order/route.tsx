export async function POST(req: Request) {

    const body = await req.json()
  
    await fetch("https://script.google.com/macros/s/AKfycbweRE7iOtYeqmq2PA8qkOhVvV0AoKUuAHCPt9Fxasx14NjXlBGHvJ1v1NbLDZZoq32IrA/exec", {
      method: "POST",
      body: JSON.stringify(body)
    })
  
    return new Response(JSON.stringify({ success: true }))
  }
  
