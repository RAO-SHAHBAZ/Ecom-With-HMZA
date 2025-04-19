export async function POST(req) {
    const body = await req.json();
    const { email, password } = body;
  
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
  
    if (email === adminEmail && password === adminPassword) {
      return Response.json({ success: true });
    } else {
      return Response.json({ success: false }, { status: 401 });
    }
  }
  