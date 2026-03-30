export async function POST(req: Request) {
    try {
        const { url } = await req.json()

        if (!url) {
            return Response.json({ error: "URL is required" }, { status: 400 })
        }

        const res = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${process.env.GOOGLE_API_KEY}`
    )

        const data = await res.json()

        return Response.json(data)
    } catch (error) {
        return Response.json({ error: "Something went wrong" }, { status: 500 })
    }
}