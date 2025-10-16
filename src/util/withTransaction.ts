import mongoose from "mongoose";
import { errorLogger } from "../shared/logger";

const withTransaction = async <T>(
  fn: (session: mongoose.ClientSession) => Promise<T>
): Promise<T> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const result = await fn(session);
    await session.commitTransaction();
    session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    errorLogger.error("Stripe session creation failed", error);
    throw error;
  }
};

export default withTransaction;
