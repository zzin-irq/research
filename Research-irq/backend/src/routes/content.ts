import { Router } from 'express';
import { db } from '../db/index.js';

export const contentRouter = Router();

// Research / Articles
contentRouter.get('/research', async (req, res) => {
  try {
    const { topic } = req.query;
    let query = db.selectFrom('articles')
      .leftJoin('people', 'people.id', 'articles.author_id')
      .leftJoin('topics', 'topics.id', 'articles.topic_id')
      .select([
        'articles.id', 'articles.slug', 'articles.title', 'articles.summary', 
        'articles.published_at', 'articles.status',
        'people.name as author_name', 'topics.name as topic_name'
      ])
      .where('articles.status', '=', 'published')
      .orderBy('articles.published_at', 'desc');

    if (topic && typeof topic === 'string') {
      query = query.where('topics.slug', '=', topic);
    }

    const items = await query.execute();
    res.json({ items, total: items.length });
  } catch (err) {
    res.status(500).json({ error: { code: 'internal_error', message: 'Database error' } });
  }
});

contentRouter.get('/research/:slug', async (req, res) => {
  try {
    const article = await db.selectFrom('articles')
      .leftJoin('people', 'people.id', 'articles.author_id')
      .leftJoin('topics', 'topics.id', 'articles.topic_id')
      .select([
        'articles.id', 'articles.slug', 'articles.title', 'articles.summary', 
        'articles.body_html', 'articles.published_at',
        'people.name as author_name', 'people.slug as author_slug',
        'topics.name as topic_name', 'topics.slug as topic_slug'
      ])
      .where('articles.slug', '=', req.params.slug)
      .where('articles.status', '=', 'published')
      .executeTakeFirst();

    if (!article) {
      return res.status(404).json({ error: { code: 'not_found', message: 'Not found' } });
    }
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: { code: 'internal_error', message: 'Database error' } });
  }
});

// People
contentRouter.get('/people', async (_req, res) => {
  try {
    const items = await db.selectFrom('people')
      .selectAll()
      .where('deleted_at', 'is', null)
      .orderBy('name', 'asc')
      .execute();
    res.json({ items });
  } catch (err) {
    res.status(500).json({ error: { code: 'internal_error', message: 'Database error' } });
  }
});

contentRouter.get('/people/:slug', async (req, res) => {
  try {
    const person = await db.selectFrom('people')
      .selectAll()
      .where('slug', '=', req.params.slug)
      .where('deleted_at', 'is', null)
      .executeTakeFirst();

    if (!person) {
      return res.status(404).json({ error: { code: 'not_found', message: 'Not found' } });
    }
    res.json(person);
  } catch (err) {
    res.status(500).json({ error: { code: 'internal_error', message: 'Database error' } });
  }
});

// Topics
contentRouter.get('/topics', async (_req, res) => {
  try {
    const items = await db.selectFrom('topics')
      .selectAll()
      .orderBy('sort_order', 'asc')
      .execute();
    res.json({ items });
  } catch (err) {
    res.status(500).json({ error: { code: 'internal_error', message: 'Database error' } });
  }
});

// Events
contentRouter.get('/events', async (_req, res) => {
  try {
    const items = await db.selectFrom('events')
      .selectAll()
      .where('status', '=', 'published')
      .orderBy('starts_at', 'desc')
      .execute();
    res.json({ items });
  } catch (err) {
    res.status(500).json({ error: { code: 'internal_error', message: 'Database error' } });
  }
});
