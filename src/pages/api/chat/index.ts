import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiKey = req.body.apiKey;
  try {
    const configuration = new Configuration({
      apiKey,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Say this is a test",
      temperature: 0,
      // stop: ["Human:", "AI:"],
    });
    console.log("response", response);
    res.status(200).json({ response: response.data.choices[0] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "error" });
    return;
  }
}

export default handler;
