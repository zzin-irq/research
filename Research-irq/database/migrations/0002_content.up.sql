-- Content tables: people, articles, publications, events, media.

-- People (researchers, fellows, staff)
CREATE TABLE IF NOT EXISTS people (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        text UNIQUE NOT NULL,
  name        text NOT NULL,
  role        text NOT NULL,
  bio_html    text NOT NULL DEFAULT '',
  photo_url   text,
  links       jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  deleted_at  timestamptz
);
CREATE TRIGGER trg_people_updated BEFORE UPDATE ON people
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Media (images, PDFs)
CREATE TABLE IF NOT EXISTS media (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id    uuid REFERENCES users(id) ON DELETE SET NULL,
  kind        text NOT NULL CHECK (kind IN ('image', 'pdf')),
  url         text NOT NULL,
  mime        text NOT NULL,
  width       int,
  height      int,
  size_bytes  bigint,
  alt         text,
  credit      text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Articles
CREATE TABLE IF NOT EXISTS articles (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         text UNIQUE NOT NULL,
  title        text NOT NULL,
  summary      text NOT NULL DEFAULT '',
  body_html    text NOT NULL DEFAULT '',
  author_id    uuid REFERENCES people(id) ON DELETE SET NULL,
  topic_id     uuid REFERENCES topics(id) ON DELETE SET NULL,
  hero_media_id uuid REFERENCES media(id) ON DELETE SET NULL,
  status       text NOT NULL DEFAULT 'draft'
                CHECK (status IN ('draft', 'in_review', 'scheduled', 'published', 'archived')),
  published_at timestamptz,
  scheduled_for timestamptz,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  deleted_at   timestamptz,
  tsv          tsvector
);
CREATE INDEX IF NOT EXISTS idx_articles_status_pub ON articles (status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_topic ON articles (topic_id);
CREATE INDEX IF NOT EXISTS idx_articles_tsv ON articles USING GIN (tsv);
CREATE TRIGGER trg_articles_updated BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Maintain tsv on insert/update
CREATE OR REPLACE FUNCTION articles_tsv_trigger() RETURNS trigger AS $$
BEGIN
  NEW.tsv :=
    setweight(to_tsvector('english', coalesce(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.summary, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.body_html, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_articles_tsv BEFORE INSERT OR UPDATE OF title, summary, body_html
  ON articles FOR EACH ROW EXECUTE FUNCTION articles_tsv_trigger();

-- Publications
CREATE TABLE IF NOT EXISTS publications (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        text UNIQUE NOT NULL,
  title       text NOT NULL,
  abstract    text NOT NULL DEFAULT '',
  pdf_url     text,
  doi         text,
  year        int,
  topic_id    uuid REFERENCES topics(id) ON DELETE SET NULL,
  status      text NOT NULL DEFAULT 'draft'
                CHECK (status IN ('draft', 'published', 'archived')),
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  deleted_at  timestamptz
);
CREATE TRIGGER trg_publications_updated BEFORE UPDATE ON publications
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Events
CREATE TABLE IF NOT EXISTS events (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        text UNIQUE NOT NULL,
  title       text NOT NULL,
  description text NOT NULL DEFAULT '',
  starts_at   timestamptz NOT NULL,
  ends_at     timestamptz,
  location    text,
  rsvp_url    text,
  status      text NOT NULL DEFAULT 'draft'
                CHECK (status IN ('draft', 'published', 'archived')),
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_events_starts_at ON events (starts_at);
CREATE TRIGGER trg_events_updated BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
