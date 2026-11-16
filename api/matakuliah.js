// API Route: GET /api/matakuliah - Get all mata kuliah
// API Route: POST /api/matakuliah - Create new mata kuliah
// API Route: DELETE /api/matakuliah - Delete mata kuliah
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
    const collection = db.collection('matakuliah');

    if (req.method === 'GET') {
      // Get all mata kuliah
      const matakuliah = await collection.find({}).toArray();
      return res.status(200).json(matakuliah);
    }

    if (req.method === 'POST') {
      // Create new mata kuliah
      const mk = req.body;
      const result = await collection.insertOne(mk);
      return res.status(201).json({ 
        success: true, 
        _id: result.insertedId,
        ...mk 
      });
    }

    if (req.method === 'DELETE') {
      // Delete mata kuliah by ID
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ error: 'Missing mata kuliah ID' });
      }
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Mata kuliah not found' });
      }
      return res.status(200).json({ success: true, message: 'Mata kuliah deleted' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Database error', details: error.message });
  }
}
