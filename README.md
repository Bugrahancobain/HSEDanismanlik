# HSEDanismanlik
# Form Submission with Google Sheets Integration and EmailJS

This project is a Next.js application that implements a user-friendly form submission system. It integrates with Google Sheets for data storage and uses EmailJS to send confirmation emails. The app is built with Next.js 13+ using the App Router structure.

## Features

- **Form Submission**: Users can submit their details using a structured form.
- **Google Sheets Integration**: Submitted data is stored directly in a Google Sheets document using a Google Apps Script.
- **Email Notification**: Sends confirmation emails to both the user and the admin using EmailJS.
- **Proxy API Integration**: A proxy API route handles requests and forwards them to Google Apps Script to avoid CORS issues.
- **Responsive Design**: A mobile-friendly, responsive design ensures usability on various devices.

---

## Table of Contents

- [Getting Started](#getting-started)
- [File Structure](#file-structure)
- [Setup and Installation](#setup-and-installation)
- [Google Sheets Integration](#google-sheets-integration)
- [EmailJS Configuration](#emailjs-configuration)
- [Usage](#usage)
- [Deployment](#deployment)
- [License](#license)

---

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Google account for Google Sheets integration
- EmailJS account

### File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── proxy/
│   │   │   ├── route.js  // Proxy API route
│   ├── page.js           // Main application file
│   ├── globals.css       // Global CSS for styling
```

---

## Setup and Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables**:

   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   EMAILJS_SERVICE_ID=your_service_id
   EMAILJS_TEMPLATE_ID=your_template_id
   EMAILJS_PUBLIC_KEY=your_public_key
   GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```

4. **Run the Development Server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Google Sheets Integration

1. **Create a Google Sheet**:
   - Add the following headers to the first row:
     ```
     Name | Email | Phone | School | IB/AP/AL | Test Results | Research | Projects | Internships | Competitions | Volunteer Work | Certifications | Hobbies | Additional
     ```

2. **Create a Google Apps Script**:
   - Navigate to **Extensions > Apps Script** in your Google Sheet.
   - Paste the following script:

     ```javascript
     function doPost(e) {
       const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
       const params = JSON.parse(e.postData.contents);

       sheet.appendRow([
         params.name,
         params.email,
         params.phone,
         params.school,
         params.ib_ap_al,
         params.testResults,
         params.research,
         params.projects,
         params.internships,
         params.competitions,
         params.volunteerWork,
         params.certifications,
         params.hobbies,
         params.additional,
       ]);

       return ContentService.createTextOutput(
         JSON.stringify({ result: "success" })
       ).setMimeType(ContentService.MimeType.JSON);
     }
     ```

3. **Deploy the Script**:
   - Go to **Deploy > New Deployment**.
   - Select **Web App**.
   - Set **Execute as** to `Me`.
   - Set **Who has access** to `Anyone`.
   - Copy the deployment URL and add it to your `.env.local` file as `GOOGLE_SCRIPT_URL`.

---

## EmailJS Configuration

1. **Sign Up for EmailJS**:
   - Create an account at [https://www.emailjs.com](https://www.emailjs.com).

2. **Create an Email Template**:
   - In the EmailJS dashboard, create a new template.
   - Add placeholders for form data (e.g., `{{name}}`, `{{email}}`, etc.).

3. **Configure EmailJS**:
   - Get your `Service ID`, `Template ID`, and `Public Key`.
   - Add them to your `.env.local` file.

---

## Usage

1. Fill out the form on the application page.
2. Submit the form.
3. Data will be:
   - Stored in the connected Google Sheet.
   - Sent via email using EmailJS.

---

## Deployment

To deploy the app, use a platform like Vercel:

1. **Deploy on Vercel**:
   - Link your GitHub repository to Vercel.
   - Add the environment variables in the Vercel dashboard.
   - Deploy the project.

2. **Access Your Application**:
   - The deployed application will be available at your Vercel domain.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Google Sheets API](https://developers.google.com/sheets/api/)
- [EmailJS](https://www.emailjs.com/)

