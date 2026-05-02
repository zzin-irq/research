-- Rollback for 0001_init. Manual use only — never auto-run.
DROP TABLE IF EXISTS contact_messages;
DROP TABLE IF EXISTS audit_log;
DROP TABLE IF EXISTS topics;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS users;
DROP FUNCTION IF EXISTS set_updated_at();
