import { connectDB } from "@utils/db.js";
import Prompt from "@models/prompt.js";

export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const prompts = await Prompt.find({creator: params.id}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to fetch all Prompts", { status: 500 });
  }
};
