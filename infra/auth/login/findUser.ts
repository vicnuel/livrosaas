import db from "@/lib/db";
import { User } from "next-auth";
import { compareSync } from "bcrypt-ts";

export const findUser = async (credentials: {
  email: string;
  password: string;
}): Promise<User | null> => {
  const user = await db.users.findFirst({
    where: {
      email: credentials.email,
    },
  });

  if (!user) {
    return null;
  }

  const passwordMatch = compareSync(credentials.password, user.password);

  if (!passwordMatch) {
    return null;
  }

  return {
    // id: user.id,
    name: user.name,
    email: user.email,
    id: user.id.toString(),
  };
};
