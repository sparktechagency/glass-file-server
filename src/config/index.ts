import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  ip_address: process.env.IP,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS!,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_expire_in: process.env.JWT_EXPIRE_IN,
    jwtRefreshSecret: process.env.JWT_SECRET!,
    jwtRefreshExpiresIn: process.env.JWT_EXPIRE_IN!,
  },
  stripe: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY!,
    webhookSecret: process.env.WEBHOOK_SECRET!,
    paymentSuccess: process.env.PAYMENT_SUCCESS!,
    paymentFailed: process.env.PAYMENT_FAILED!,
    CONNECTED_ACCOUNT_CREATE_URL: process.env.CONNECTED_ACCOUNT_CREATE_URL!,
    CONNECTED_ACCOUNT_SUCCESS_URL: process.env.CONNECTED_ACCOUNT_SUCCESS_URL!,
    CONNECTED_ACCOUNT_FAILD_URL: process.env.CONNECTED_ACCOUNT_FAILD_URL!,
  },
  email: {
    from: process.env.EMAIL_FROM,
    user: process.env.EMAIL_USER,
    port: process.env.EMAIL_PORT,
    host: process.env.EMAIL_HOST,
    pass: process.env.EMAIL_PASS,
  },
  social: {
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    facebook_client_id: process.env.FACEBOOK_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    facebook_client_secret: process.env.FACEBOOK_CLIENT_SECRET,
  },
  admin: {
    email: process.env.SUPER_ADMIN_EMAIL,
    password: process.env.SUPER_ADMIN_PASSWORD,
    confirmPassword: process.env.SUPER_ADMIN_PASSWORD,
  },
};
