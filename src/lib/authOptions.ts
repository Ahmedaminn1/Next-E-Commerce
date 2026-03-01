import { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Your-Email@example.com" },
        password: { label: "password", type: "password", placeholder: "********" },
      },
      authorize: async (credentials) => {
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          },
        );
        const data = await response.json();

        if (data.message === "success") {
          const decodedToken: { id: string } = jwtDecode(data.token);
          console.log(decodedToken);

          return {
            id: decodedToken.id,
            user: data.user,
            token: data.token,
          };
        } else {
          throw new Error(data.message || "Wrong Credentials");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = token.user
      }
      return session
    },
  },
};
