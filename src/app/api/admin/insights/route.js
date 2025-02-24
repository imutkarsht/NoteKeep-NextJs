import dbConnect from "@/lib/db";
import Note from "@/lib/models/noteModel";
import Review from "@/lib/models/reviewModel";
import Bug from "@/lib/models/bugModel";
import Accounts from "@/lib/models/userModel";

export async function GET(req) {
  try {
    await dbConnect();

    const [noteCount, accountCount, reviewCount, bugCount] = await Promise.all([
      Note.countDocuments(),
      Accounts.countDocuments(),
      Review.countDocuments(),
      Bug.countDocuments(),
    ]);

    return Response.json({
      notes: noteCount,
      accounts: accountCount,
      reviews: reviewCount,
      bugs: bugCount,
    });
  } catch (err) {
    console.error("Error fetching database counts:", err);
    return Response.json(
      { message: "Error fetching data", error: err.message },
      { status: 500 }
    );
  }
}
