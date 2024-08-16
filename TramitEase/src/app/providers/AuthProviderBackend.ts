import EmailPassword from"supertokens-node/recipe/emailpassword";
import ThirdParty from"supertokens-node/recipe/thirdparty";
import express from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import { errorHandler, middleware } from 'supertokens-node/framework/express';

supertokens.init({
    framework: "express",
    supertokens: {
        // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
        connectionURI: "https://try.supertokens.com",
        // apiKey: <API_KEY(if configured)>,
    },
    appInfo: {
        appName: "tramit ease",
        apiDomain: "http://localhost:5173",
        websiteDomain: "http://localhost:5173",
        apiBasePath: "/authapi",
        websiteBasePath: "/authbase"
    },
    recipeList: [
        EmailPassword.init(),
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [{
                    config: {
                        thirdPartyId: "google",
                        clients: [{
                            clientId: "552469563472-c88btodjog0f23em3n9ukdp26ivn3nej.apps.googleusercontent.com",
                            clientSecret: "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"
                        }]
                    }
                }],
            }
        }),
    ]
});

let app = express();

app.use(cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
}));

app.use(middleware());
app.use(errorHandler())

