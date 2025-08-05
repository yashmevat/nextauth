export const emailTemplate = ({ emailTitle, emailMessage, actionLink }) => {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <h2 style="color: #333333; margin-bottom: 20px;">${emailTitle}</h2>

        <p style="font-size: 16px; color: #555555; line-height: 1.6;">${emailMessage}</p>

        <a href="${actionLink}"
           style="display: inline-block; margin: 25px 0; padding: 12px 24px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px;">
           Click Here
        </a>

        <p style="font-size: 14px; color: #555555; line-height: 1.6;">
          Or copy and paste this URL into your browser:<br/>
          <span style="color: #007bff; word-break: break-all;">${actionLink}</span>
        </p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eeeeee;">

        <p style="font-size: 13px; color: #999999;">
          If you didn’t request this, you can safely ignore this email.
        </p>
      </div>
    </div>
  `;
};
