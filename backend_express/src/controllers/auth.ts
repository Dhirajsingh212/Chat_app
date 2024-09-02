import { prisma } from "../db/db";
import { genToken, hashPassword, verifyHashedPassword } from "../utils";

export async function LoginFunction(req: any, res: any) {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or wrong credentials",
      });
    }

    const decoded = await verifyHashedPassword(password, user?.password);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Wrong credentials",
      });
    }

    const token = genToken(user?.id, user?.username);
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({
        success: true,
        message: "successfull",
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function SignupFunction(req: any, res: any) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const token = genToken(newUser.id, newUser.username);

    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({
        success: true,
        message: "successfull",
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
