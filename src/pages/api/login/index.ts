import {
  checkValidationTransition,
  createTransaction,
  getConnection,
} from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiKey = req.body.apiKey;

  const resolve = (data: any) => {
    res.status(200).json({ response: data });
  };

  const reject = (message: string) => new Error(message);

  try {
    const db = await getConnection();
    checkValidationTransition(db, "api_key", reject);
    let transaction = createTransaction(
      db,
      "readwrite",
      "api_key",
      resolve,
      reject
    );
    let objectStore = transaction.objectStore("api_key");
    let request = objectStore.add(apiKey, "apiKey");

    request.onsuccess = (e: any) => {
      transaction.commit?.();
      resolve(e);
    };
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
    return;
  }
}

export default handler;
