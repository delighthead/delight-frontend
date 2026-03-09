# EmailJS Setup Instructions

To enable automatic email sending from the contact form, follow these steps:

## 1. Create EmailJS Account
- Go to https://www.emailjs.com/
- Sign up for a free account

## 2. Add Email Service
- Go to "Email Services" in your dashboard
- Click "Add New Service"
- Choose Gmail (or your preferred email provider)
- Connect your delightintschool@gmail.com account
- Note the **Service ID** (e.g., "service_delight")

## 3. Create Email Template
- Go to "Email Templates"
- Click "Create New Template"
- Use this template structure:

**Subject:** New message from {{from_name}}

**Content:**
```
You have received a new message from your website contact form:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

- Note the **Template ID** (e.g., "template_contact")

## 4. Get Public Key
- Go to "Account" → "General"
- Find your **Public Key** (e.g., "YOUR_PUBLIC_KEY")

## 5. Update Contact.tsx
Open `src/pages/Contact/Contact.tsx` and replace these values:

```typescript
await emailjs.send(
  'service_delight',    // Replace with your Service ID
  'template_contact',   // Replace with your Template ID
  {
    from_name: formData.fullName,
    from_email: formData.email,
    message: formData.message,
    to_email: 'delightintschool@gmail.com',
  },
  'YOUR_PUBLIC_KEY'     // Replace with your Public Key
);
```

## 6. Test the Form
- Refresh your website
- Fill out the contact form
- Submit and check delightintschool@gmail.com for the email

## Free Tier Limits
- 200 emails per month
- Should be sufficient for most school websites
- Upgrade if you need more

## Alternative Solution (if you prefer)
If you don't want to use EmailJS, you can use other services like:
- Formspree: https://formspree.io/
- Web3Forms: https://web3forms.com/
- SendGrid (requires backend)
