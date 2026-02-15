import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) => {
    if (!process.env.RESEND_API_KEY) {
        console.log("Resend API Key missing, skipping email send");
        return;
    }

    try {
        const data = await resend.emails.send({
            from: "UGKTED <onboarding@resend.dev>", // Update with verified domain later
            to,
            subject,
            html,
        });
        return data;
    } catch (error) {
        console.error("Email send error:", error);
        throw error;
    }
};
