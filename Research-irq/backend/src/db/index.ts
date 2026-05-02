import { Kysely, PostgresDialect } from 'kysely';
import pg from 'pg';
import { env } from '../config/env.js';

// Minimal type stubs — replace with the generated DB types once the schema is live.
export interface Database {
  schema_migrations: { version: string; applied_at: Date };
  users: {
    id: string;
    email: string;
    password_hash: string;
    role: 'user' | 'admin' | 'super';
    name: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
  };
  topics: {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    sort_order: number;
    created_at: Date;
    updated_at: Date;
  };
  people: {
    id: string;
    slug: string;
    name: string;
    role: string;
    bio_html: string;
    photo_url: string | null;
    links: any;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
  };
  media: {
    id: string;
    owner_id: string | null;
    kind: 'image' | 'pdf';
    url: string;
    mime: string;
    width: number | null;
    height: number | null;
    size_bytes: number | null;
    alt: string | null;
    credit: string | null;
    created_at: Date;
  };
  articles: {
    id: string;
    slug: string;
    title: string;
    summary: string;
    body_html: string;
    author_id: string | null;
    topic_id: string | null;
    hero_media_id: string | null;
    status: 'draft' | 'in_review' | 'scheduled' | 'published' | 'archived';
    published_at: Date | null;
    scheduled_for: Date | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
  };
  publications: {
    id: string;
    slug: string;
    title: string;
    abstract: string;
    pdf_url: string | null;
    doi: string | null;
    year: number | null;
    topic_id: string | null;
    status: 'draft' | 'published' | 'archived';
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
  };
  events: {
    id: string;
    slug: string;
    title: string;
    description: string;
    starts_at: Date;
    ends_at: Date | null;
    location: string | null;
    rsvp_url: string | null;
    status: 'draft' | 'published' | 'archived';
    created_at: Date;
    updated_at: Date;
  };
  contact_messages: {
    id: string;
    name: string;
    email: string;
    subject: string;
    body: string;
    ip: string | null;
    user_agent: string | null;
    created_at: Date;
    handled_at: Date | null;
  };
}

export const pgPool = new pg.Pool({ connectionString: env.DATABASE_URL });

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({ pool: pgPool })
});
