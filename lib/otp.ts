import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function sendOTP(mobile: string) {
    try {
        const verification = await client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID!)
            .verifications
            .create({ to: `+91${mobile}`, channel: 'sms' });
        return verification.status;
    } catch (error) {
        console.error("Error sending OTP:", error);
        throw error;
    }
}

export async function verifyOTP(mobile: string, otp: string) {
    try {
        const verificationCheck = await client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID!)
            .verificationChecks
            .create({ to: `+91${mobile}`, code: otp });
        return verificationCheck.status === 'approved';
    } catch (error) {
        console.error("Error verifying OTP:", error);
        throw error;
    }
}
