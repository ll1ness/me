/**
 * AppWrite Collections Setup Script
 * 
 * This script creates the required collections and attributes in AppWrite.
 * 
 * Usage:
 * 1. Install AppWrite CLI: npm install -g appwrite-cli
 * 2. Login: appwrite login
 * 3. Initialize: appwrite init
 * 4. Run: node setup-appwrite.js
 * 
 * Or use with environment variables:
 * APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
 * APPWRITE_PROJECT_ID=your_project_id
 * APPWRITE_API_KEY=your_api_key
 */

const Appwrite = require('appwrite');

// Load environment variables from .env file if available
require('dotenv').config();

const config = {
    endpoint: process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
    projectId: process.env.APPWRITE_PROJECT_ID,
    apiKey: process.env.APPWRITE_API_KEY,
    databaseId: process.env.APPWRITE_DATABASE_ID || process.env.APPWRITE_PROJECT_ID
};

// Collection definitions
const collections = [
    {
        name: 'contact_submissions',
        collectionId: 'contact_submissions',
        permissions: {
            read: ['role:all'],
            create: ['role:all'],
            update: ['role:admin'],
            delete: ['role:admin']
        },
        attributes: [
            { key: 'name', type: 'string', size: 255, required: true },
            { key: 'email', type: 'string', size: 255, required: true },
            { key: 'message', type: 'string', size: 5000, required: true },
            { key: 'subject', type: 'string', size: 255, required: false },
            { key: 'status', type: 'string', size: 50, required: false },
            { key: 'ip', type: 'string', size: 45, required: false },
            { key: 'userAgent', type: 'string', size: 255, required: false },
            { key: 'createdAt', type: string, size: 255, required: true }
        ],
        indexes: [
            { key: 'email', type: 'key', attributes: ['email'] },
            { key: 'status', type: 'key', attributes: ['status'] },
            { key: 'createdAt', type: 'key', attributes: ['createdAt'] }
        ]
    },
    {
        name: 'chat_messages',
        collectionId: 'chat_messages',
        permissions: {
            read: ['role:all'],
            create: ['role:all'],
            update: ['role:admin'],
            delete: ['role:admin']
        },
        attributes: [
            { key: 'text', type: 'string', size: 2000, required: true },
            { key: 'sender', type: 'enum', elements: ['user', 'bot'], required: true, default: 'user' },
            { key: 'sessionId', type: 'string', size: 100, required: true },
            { key: 'timestamp', type: 'string', size: 255, required: true },
            { key: 'userAgent', type: 'string', size: 255, required: false }
        ],
        indexes: [
            { key: 'sessionId', type: 'key', attributes: ['sessionId'] },
            { key: 'timestamp', type: 'key', attributes: ['timestamp'] }
        ]
    },
    {
        name: 'portfolio',
        collectionId: 'portfolio',
        permissions: {
            read: ['role:all'],
            create: ['role:admin'],
            update: ['role:admin'],
            delete: ['role:admin']
        },
        attributes: [
            { key: 'title', type: 'string', size: 255, required: true },
            { key: 'category', type: 'string', size: 100, required: true },
            { key: 'description', type: 'string', size: 1000, required: true },
            { key: 'image', type: 'string', size: 500, required: true },
            { key: 'link', type: 'string', size: 500, required: true }
        ],
        indexes: [
            { key: 'category', type: 'key', attributes: ['category'] }
        ]
    }
];

async function setup() {
    if (!config.projectId) {
        console.error('❌ APPWRITE_PROJECT_ID is required');
        process.exit(1);
    }

    console.log('🚀 Setting up AppWrite collections...\n');
    console.log('Endpoint:', config.endpoint);
    console.log('Project ID:', config.projectId);
    console.log('Database ID:', config.databaseId);
    console.log('');

    // Initialize client
    const client = new Appwrite.Client();
    client.setEndpoint(config.endpoint).setProject(config.projectId);

    if (config.apiKey) {
        client.setKey(config.apiKey);
        console.log('🔑 Using API key authentication');
    } else {
        console.log('👤 Using anonymous access (ensure collection permissions allow public access)');
    }

    const db = new Appwrite.Database(client);

    // Check if database exists, create if needed
    try {
        console.log('📦 Checking database...');
        await db.get(config.databaseId);
        console.log('   Database exists');
    } catch (error) {
        console.log('   Creating database...');
        // Database creation requires API key
        if (!config.apiKey) {
            console.error('❌ Cannot create database without API key. Please create database manually.');
            process.exit(1);
        }
        // Note: Database creation via SDK may differ, check AppWrite docs
        console.log('   Please create database manually in console with ID:', config.databaseId);
    }

    // Create collections
    for (const collection of collections) {
        try {
            console.log(`\n📁 Creating collection: ${collection.name}`);
            
            try {
                const existing = await db.getCollection(config.databaseId, collection.collectionId);
                console.log(`   ⚠️  Collection already exists (ID: ${collection.collectionId})`);
                console.log('   Skipping creation, but will ensure attributes...');
            } catch (err) {
                // Collection doesn't exist, create it
                const response = await db.createCollection(
                    config.databaseId,
                    collection.collectionId,
                    collection.name,
                    [
                        // Read permission
                        ...(collection.permissions.read.map(p => `read:${p}`)),
                        // Write permissions
                        ...(collection.permissions.create.map(p => `create:${p}`)),
                        ...(collection.permissions.update.map(p => `update:${p}`)),
                        ...(collection.permissions.delete.map(p => `delete:${p}`))
                    ]
                );
                console.log(`   ✅ Created collection: ${response.name} (${response.$id})`);
            }

            // Ensure attributes exist
            console.log('   Ensuring attributes...');
            for (const attr of collection.attributes) {
                try {
                    await db.createStringAttribute(
                        config.databaseId,
                        collection.collectionId,
                        attr.key,
                        attr.required,
                        attr.size,
                        null // array of defaults not used
                    );
                    console.log(`   ✓ Attribute created: ${attr.key}`);
                } catch (error) {
                    if (error.code === 409) {
                        // Attribute already exists
                        console.log(`   ◦ Attribute exists: ${attr.key}`);
                    } else {
                        throw error;
                    }
                }
            }

            // Ensure indexes exist
            console.log('   Ensuring indexes...');
            for (const idx of collection.indexes) {
                try {
                    await db.createIndex(
                        config.databaseId,
                        collection.collectionId,
                        idx.key,
                        idx.attributes,
                        idx.type
                    );
                    console.log(`   ✓ Index created: ${idx.key}`);
                } catch (error) {
                    if (error.code === 409) {
                        console.log(`   ◦ Index exists: ${idx.key}`);
                    } else {
                        throw error;
                    }
                }
            }

            console.log(`   ✅ Collection ${collection.name} ready`);
        } catch (error) {
            console.error(`   ❌ Error setting up ${collection.name}:`, error.message);
        }
    }

    console.log('\n✅ Setup complete!');
    console.log('\nNext steps:');
    console.log('1. Update appwrite-config.js with your collection IDs');
    console.log('2. Test the integration by submitting the contact form');
    console.log('3. Check AppWrite console to verify data is being stored');
    console.log('\n📚 See APPWRITE_INTEGRATION.md for full documentation');
}

// Run setup
setup().catch(error => {
    console.error('❌ Setup failed:', error);
    process.exit(1);
});
