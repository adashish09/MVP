const API_KEY = "AIzaSyACEeqZhDgnd0vI24ZOA1_smstbgCRbcCs"; 
const geminiGeneration = async (req, res) => {

  const { prompt } = req.body;
  console.log("Received prompt:", prompt);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Google API error:", data);
      return res
        .status(response.status)
        .json({ error: data.error || "Google API error" });
    }


    res.json(data); 
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}



module.exports = {geminiGeneration};