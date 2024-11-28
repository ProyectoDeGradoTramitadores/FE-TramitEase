import { auth, googleProvider } from './firebaseService';
import {
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    deleteUser,
    sendPasswordResetEmail,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    } catch (error) {
        console.error("Error during Google sign-in:", error);
        throw error;
    }
};

export const signInWithEmail = async (email: string, password: string) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        console.log(result, "user");
        return result.user;
    } catch (error) {
        console.error("Error during email sign-in:", error.message);
        throw error;
    }
};

export const registerWithEmail = async (email: string, password: string, displayName: string) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName });
        return result.user;
    } catch (error) {
        console.error("Error during email registration:", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error during logout:", error);
        throw error;
    }
};

export const sendPasswordReset = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        console.error("Error during password reset:", error);
        throw error;
    }
};

export const setupRecaptchaVerifier = (): RecaptchaVerifier => {
    const verifier = new RecaptchaVerifier(auth,
        'recaptcha-container',
        {
            size: "normal",
            callback: (response: never) => {
                console.log("Recaptcha verified successfully ", response);
            },
        },

    );
    return verifier;
};


export const signInWithPhone = async (phoneNumber: string, recaptchaVerifier: RecaptchaVerifier) => {
    try {
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
        return confirmationResult;
    } catch (error) {
        console.error("Error during phone sign-in:", error);
        throw error;
    }
};

export const deleteUserAccount = async () => {
    try {
        const user = auth.currentUser;
        if (user) {
            await deleteUser(user);
            console.log("User account deleted successfully.");
        } else {
            throw new Error("No authenticated user found.");
        }
    } catch (error) {
        console.error("Error deleting user account:", error);
        throw error;
    }
};