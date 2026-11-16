// API Route: GET /api/comments - Get all comments
// API Route: POST /api/comments - Create new comment
// API Route: DELETE /api/comments - Delete comment by ID
import clientPromise from './mongodb.js';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const client = await clientPromise;
    const db = client.db('tugasdb');
    const collection = db.collection('comments');

    if (req.method === 'GET') {
      // Get all comments
      const comments = await collection.find({}).sort({ at: -1 }).toArray();
      return res.status(200).json(comments);
    }

    if (req.method === 'POST') {
      // Create new comment
      const comment = req.body;
      comment.at = Date.now();
      const result = await collection.insertOne(comment);
      return res.status(201).json({ 
        success: true, 
        _id: result.insertedId,
        ...comment 
      });
    }

    if (req.method === 'DELETE') {
      // Delete comment by ID
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ error: 'Missing comment ID' });
      }
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      return res.status(200).json({ success: true, message: 'Comment deleted' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Database error', details: error.message });
  }
}
