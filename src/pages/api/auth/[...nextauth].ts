import NextAuth from "next-auth"
import StravaProvider from "next-auth/providers/strava"

export default NextAuth({
    providers: [
        StravaProvider({
            clientId: process.env.STRAVA_CLIENT_ID,
             clientSecret: process.env.STRAVA_CLIENT_SECRET,
             authorization: {
                url: "https://www.strava.com/api/v3/oauth/authorize",
                params: {
                  scope: "activity:read_all,read,read_all,profile:read_all,activity:read",
                  approval_prompt: "auto",
                  response_type: "code",
                },
              },
        }),
    ],
    callbacks: {
      async jwt({ token, account }) {
        if (account) {
           token.accessToken = account.access_token
           token.refreshToken = account.refresh_token
           token.athleteId = account.providerAccountId
        }
        return token
      },
      async session({ session, token }) {
        session.accessToken = token.accessToken
        session.refreshToken = token.refreshToken
        session.athleteId = token.athleteId
        return session
      }
    },
    secret: process.env.JWT_SECRET,
})