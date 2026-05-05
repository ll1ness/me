# AppWrite Integration Guide

This document provides step-by-step instructions for setting up AppWrite backend for the ЛИНЕСС website.

## Overview

The site is prepared to use AppWrite for:
- **Contact Form Submissions** - Store and manage contact requests
- **Chat Messages** - Persistent chat history (optional real-time)
- **Portfolio Data** - Dynamic portfolio management (optional, JSON fallback available)

The integration includes automatic fallback to localStorage/JSON if AppWrite is unavailable.

## Prerequisites

- An AppWrite account (cloud or self-hosted)
- Basic understanding of AppWrite console

## Setup Steps

### 1. Create AppWrite Project

1. Go to [AppWrite Cloud](https://cloud.appwrite.io) or your self-hosted instance
2. Click "Create Project"
3. Enter project name: `ll1ness-website`
4. Note your **Project ID** - you'll need it for configuration

### 2. Create Database

1. In your project, go to **Database** tab
2. Click "Create Database"
3. Name: `ll1ness-db`
4. Note the **Database ID** (usually same as project ID for default)
5. Enable "Document-level permissions" for flexibility

### 3. Create Collections

#### 3.1 Contact Submissions Collection

1. Go to **Database** → **Collections** → "Create Collection"
2. Name: `contact_submissions`
3. Collection ID: `contact_submissions` (auto-generated, note it)
4. Permissions setup:
   - **Read**: Any role (to allow admin panel reading)
   - **Create**: Any role (public can submit)
   - **Update/Delete**: Admin/Manager roles only
5. Click "Create"

**Collection Schema** (add these attributes):

| Attribute | Type | Required | Size |
|-----------|------|----------|------|
| name | String | Yes | 255 |
| email | String | Yes | 255 |
| message | String | Yes | 5000 |
| subject | String | No | 255 |
| status | String | No | 50 |
| ip | String | No | 45 |
| userAgent | String | No | 255 |
| createdAt | String | Yes | 255 |

**Indexes** (optional for performance):
- `email` - for searching
- `status` - for filtering
- `createdAt` - for sorting

#### 3.2 Chat Messages Collection

1. Create another collection
2. Name: `chat_messages`
3. Collection ID: `chat_messages`
4. Permissions:
   - **Read**: Any role (users see their messages)
   - **Create**: Any role
   - **Update/Delete**: Admin/Manager only
5. Click "Create"

**Collection Schema**:

| Attribute | Type | Required | Size |
|-----------|------|----------|------|
| text | String | Yes | 2000 |
| sender | String | Yes | 10 |
| sessionId | String | Yes | 100 |
| timestamp | String | Yes | 255 |
| userAgent | String | No | 255 |

**Indexes**:
- `sessionId` - for retrieving conversation history
- `timestamp` - for chronological order

#### 3.3 Portfolio Collection (Optional)

If you want to manage portfolio via AppWrite instead of JSON:

1. Create collection: `portfolio`
2. Permissions:
   - **Read**: Any role
   - **Create/Update/Delete**: Admin/Manager only
3. Click "Create"

**Collection Schema**:

| Attribute | Type | Required | Size |
|-----------|------|----------|------|
| title | String | Yes | 255 |
| category | String | Yes | 100 |
| description | String | Yes | 1000 |
| image | String | Yes | 500 |
| link | String | Yes | 500 |

**Indexes**:
- `category` - for filtering

### 4. Configure Environment Variables

Update `appwrite-config.js` with your actual IDs:

```javascript
const AppWriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1', // or your self-hosted URL
    projectId: 'YOUR_ACTUAL_PROJECT_ID',
    databaseId: 'YOUR_ACTUAL_DATABASE_ID',
    collections: {
        contactSubmissions: 'YOUR_CONTACT_COLLECTION_ID',
        chatMessages: 'YOUR_CHAT_COLLECTION_ID',
        portfolio: 'YOUR_PORTFOLIO_COLLECTION_ID' // optional
    },
    features: {
        useAppWriteForContact: true,
        useAppWriteForChat: true,
        useAppWriteForPortfolio: false, // set true when ready
        enableRealTimeChat: false // requires WebSocket setup
    },
    fallbackEnabled: true
};
```

**Security Note**: For production, use environment variables instead of hardcoding:

```javascript
endpoint: process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
projectId: process.env.APPWRITE_PROJECT_ID,
```

### 5. Set Up API Keys (Optional but Recommended)

For server-side operations or additional security:

1. In AppWrite Console, go to **Settings** → **API Keys**
2. Click "Create API Key"
3. Name: `ll1ness-website`
4. Select scopes:
   - `collections.read`
   - `collections.write`
   - `documents.read`
   - `documents.write`
5. Create and note the **API Key**
6. In your configuration, add:

```javascript
const client = new Appwrite.Client();
client
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey('YOUR_API_KEY'); // for server-side operations
```

**Note**: The current client-side implementation uses anonymous access with collection-level permissions.

### 6. Test the Integration

1. Open your site in browser
2. Open Developer Console (F12)
3. You should see: `AppWrite service initialized successfully`
4. Test contact form submission:
   - Fill out the form
   - Submit
   - Check AppWrite Console → Database → contact_submissions → Documents
   - You should see a new document
5. Test chat:
   - Send a message
   - Check AppWrite Console → chat_messages → Documents
   - Messages should appear with sender, timestamp, sessionId

### 7. Enable Real-Time Chat (Optional)

To enable real-time messaging with AppWrite subscriptions:

1. In `appwrite-config.js`, set:
   ```javascript
   features: {
       enableRealTimeChat: true
   }
   ```

2. Add subscription logic in `appwrite-service.js`:
   ```javascript
   subscribeToChat(sessionId, callback) {
       if (!this.initialized) return;
       
       this.client.subscribe(
           `collections/${AppWriteConfig.collections.chatMessages}/documents`,
           (response) => {
               if (response.events.includes('documents.create')) {
                   const doc = response.payload;
                   if (doc.sessionId === sessionId) {
                       callback(doc);
                   }
               }
           }
       );
   }
   ```

3. Call `appwriteService.subscribeToChat(sessionId, (message) => { ... })` in chat module

### 8. Deploy Configuration

For production deployment:

1. **Do not commit** sensitive IDs to public repository
2. Use environment variables on your hosting platform:
   - Netlify: Site settings → Build & Deploy → Environment
   - Vercel: Project settings → Environment Variables
   - GitHub Pages: Use GitHub Secrets with Actions

3. Update `appwrite-config.js` to read from environment:

```javascript
const AppWriteConfig = {
    endpoint: process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
    projectId: process.env.APPWRITE_PROJECT_ID,
    collections: {
        contactSubmissions: process.env.APPWRITE_CONTACT_COLLECTION_ID,
        chatMessages: process.env.APPWRITE_CHAT_COLLECTION_ID,
        portfolio: process.env.APPWRITE_PORTFOLIO_COLLECTION_ID
    },
    // ...
};
```

4. Build step: Create a `.env` file (gitignored) or configure hosting platform

## Fallback Behavior

The integration is designed to be resilient:

- If AppWrite is unreachable, contact forms fall back to localStorage
- Chat falls back to localStorage
- Portfolio falls back to `portfolio.json`
- All operations log warnings to console for debugging

To disable fallback (not recommended), set `fallbackEnabled: false` in config.

## Troubleshooting

### "AppWrite SDK not loaded"
- Check internet connection (SDK loads from CDN)
- Verify script tag order: config → service
- Check browser console for CORS errors

### "Permission denied" errors
- Verify collection permissions in AppWrite Console
- Ensure API key has correct scopes if using authentication
- Check that document attributes match schema exactly

### "Collection not found"
- Double-check collection IDs in config
- Ensure collections exist in the correct database
- Verify project ID is correct

### Messages not appearing in chat
- Check browser console for errors
- Verify `chat_messages` collection exists
- Check that `sessionId` is being set correctly
- Look for CORS or network errors

### Contact form not submitting
- Verify `contact_submissions` collection
- Check attribute names match schema (name, email, message, etc.)
- Look for validation errors in console

## Advanced: Admin Panel

To create an admin panel to view submissions:

1. Create a new HTML page `admin.html` (password-protected)
2. Use AppWrite to fetch documents:
   ```javascript
   const response = await db.listDocuments('contact_submissions');
   const submissions = response.documents;
   ```
3. Display in table with status toggles
4. Add ability to delete/update with proper permissions

## Advanced: Server-Side Functions

For email notifications or AI chat responses:

1. Create AppWrite Function (Cloud Functions)
2. Trigger on document creation:
   - Contact submission → send email via SMTP
   - Chat message → generate AI response (OpenAI, etc.)
3. Set up function execution in AppWrite Console

## Files Modified

- `appwrite-config.js` - Configuration (new)
- `appwrite-service.js` - Service layer (new)
- `eofjs3/EOFContactForm3.js` - Contact form integration
- `eofjs3/EOFChat3.js` - Chat integration
- `eofjs3/EOFPortfolioLoader3.js` - Portfolio integration
- `index.html` - Added AppWrite scripts
- `contact.html` - Added AppWrite scripts
- `portfolio.html` - Added AppWrite scripts

## Support

For AppWrite documentation: https://appwrite.io/docs
For issues with this integration, check browser console for errors.
