// API Route: GET /api/submissions - Get all submissions
// API Route: POST /api/submissions - Create new submission
import clientPromise from './mongodb.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const client = await clientPromise;
    const db = client.db('tugasdb');
    const collection = db.collection('submissions');

    if (req.method === 'GET') {
      // Get all submissions
      const submissions = await collection.find({}).sort({ tanggal: -1 }).toArray();
      return res.status(200).json(submissions);
    }

    if (req.method === 'POST') {
      // Create new submission
      const submission = req.body;
      submission.tanggal = new Date().toISOString();
      
      const result = await collection.insertOne(submission);
      return res.status(201).json({ 
        success: true, 
        id: result.insertedId,
        ...submission 
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Database error', details: error.message });
  }
}
