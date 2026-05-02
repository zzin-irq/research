-- Initial schema: extensions, helper functions, users, sessions, topics.
-- All timestamps are timestamptz UTC. UUIDs for content rows.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Helper: maintain updated_at on row update.
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Users
CREATE TABLE IF NOT EXISTS users (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email         text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  role          text NOT NULL CHECK (role IN ('user', 'admin', 'super')),
  name          text NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),
  deleted_at    timestamptz
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_lower ON users (lower(email));
CREATE TRIGGER trg_users_updated BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Sessions (refresh tokens, hashed)
CREATE TABLE IF NOT EXISTS sessions (
  id            bigserial PRIMARY KEY,
  user_id       uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  refresh_hash  text NOT NULL,
  user_agent    text,
  ip            inet,
  created_at    timestamptz NOT NULL DEFAULT now(),
  expires_at    timestamptz NOT NULL,
  revoked_at    timestamptz
);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions (user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions (expires_at);

-- Topics
CREATE TABLE IF NOT EXISTS topics (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        text UNIQUE NOT NULL,
  name        text NOT NULL,
  description text,
  sort_order  int NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_topics_updated BEFORE UPDATE ON topics
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Audit log
CREATE TABLE IF NOT EXISTS audit_log (
  id         bigserial PRIMARY KEY,
  actor_id   uuid REFERENCES users(id) ON DELETE SET NULL,
  action     text NOT NULL,
  entity     text NOT NULL,
  entity_id  text,
  diff       jsonb,
  ip         inet,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_audit_log_entity ON audit_log (entity, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_actor ON audit_log (actor_id, created_at DESC);

-- Contact messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id         bigserial PRIMARY KEY,
  name       text NOT NULL,
  email      text NOT NULL,
  subject    text NOT NULL,
  body       text NOT NULL,
  ip         inet,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  handled_at timestamptz
);
