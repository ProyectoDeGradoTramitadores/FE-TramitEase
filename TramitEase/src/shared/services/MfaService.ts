import Session from "supertokens-web-js/recipe/session"

async function fetchMFAInfo() {
    if (await Session.doesSessionExist()) {
        try {

        } catch (err: any) {
            if (err.isSuperTokensGeneralError === true) {
                window.alert(err.message);
            } else {
                window.alert("Oops! Something went wrong.");
            }
        }
    } else {
        throw new Error("Illegal function call: For first factor setup, you do not need to call this function")
    }
}

export default fetchMFAInfo;