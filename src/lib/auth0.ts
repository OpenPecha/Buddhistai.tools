import { Auth0Client ,filterDefaultIdTokenClaims} from "@auth0/nextjs-auth0/server";



export const auth0 = new Auth0Client({
    signInReturnToPath: "/api/auth/post-login",
    async beforeSessionSaved(session, idToken) {
      return {  
        ...session,
        user: {
          ...filterDefaultIdTokenClaims(session.user),
          foo: session.user.foo // keep the foo claim
        }
      };
    }
  });