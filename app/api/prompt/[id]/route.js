import { connectDB } from "@utils/db.js";
import Prompt from "@models/prompt.js";

export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to fetch all Prompt", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectDB();
    const exsistingPrompt = await Prompt.findById(params.id);
    if (!exsistingPrompt)
      return new Response("Prompt not found", { status: 404 });
    exsistingPrompt.prompt = prompt;
    exsistingPrompt.tag = tag;
    await exsistingPrompt.save();
    return new Response(JSON.stringify(exsistingPrompt), { status: 200 });
  } catch (err) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

export const DELETE = async (req, {params}) => {
	try {
		await connectDB()
		await Prompt.findByIdAndRemove(paramsid)
		return new Response("Prompt deleted", {status: 200})
	} catch (err) {
		return new Response("Failed to delete prompt", {status: 500})
	}
}
