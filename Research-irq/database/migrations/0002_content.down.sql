DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS publications;
DROP TRIGGER IF EXISTS trg_articles_tsv ON articles;
DROP FUNCTION IF EXISTS articles_tsv_trigger();
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS media;
DROP TABLE IF EXISTS people;
