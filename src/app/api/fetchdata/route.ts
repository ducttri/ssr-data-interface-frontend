import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const id: string = data.get("id") || "";
  const dataId: ObjectId = new ObjectId(id);
  const uri = process.env.MONGODB_URI as string;
  const client = new MongoClient(uri);
  try {
    const database = client.db("HealthData");
    const datacollection = database.collection("SampleHealthData");
    const query = { _id: dataId };
    const data = await datacollection.findOne(query);
    return NextResponse.json({ success: true, data: data });
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      success: false,
      error: "Error processing file.",
    });
  } finally {
    await client.close();
  }
}
