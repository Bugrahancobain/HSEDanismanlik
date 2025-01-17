export async function POST(req) {
    try {
        const body = await req.json();

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbzC6tugEkmdV44_RKF0KSbKEjxHRBfu9UsQ2aGQk_GB54oftOeQOrybLP1Ak4o_1VW4/exec",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );

        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error("Proxy Hatası:", error);
        return new Response(
            JSON.stringify({ error: "Proxy isteği başarısız oldu." }),
            { status: 500 }
        );
    }
}