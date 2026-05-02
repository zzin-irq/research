/**
 * Minimal forward-only SQL migration runner.
 * Applies any *.up.sql file under ../../database/migrations not yet recorded
 * in the schema_migrations table. Each migration runs in a transaction.
 */
import 'dotenv/config';
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pgPool } from './index.js';
import { logger } from '../lib/logger.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = join(__dirname, '../../../database/migrations');

async function ensureTable() {
  await pgPool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version    text PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT now()
    );
  `);
}

async function appliedSet(): Promise<Set<string>> {
  const { rows } = await pgPool.query<{ version: string }>('SELECT version FROM schema_migrations');
  return new Set(rows.map(r => r.version));
}

async function main() {
  await ensureTable();
  const applied = await appliedSet();
  const files = readdirSync(MIGRATIONS_DIR)
    .filter(f => f.endsWith('.up.sql'))
    .sort();

  for (const file of files) {
    const version = file.replace(/\.up\.sql$/, '');
    if (applied.has(version)) continue;
    const sql = readFileSync(join(MIGRATIONS_DIR, file), 'utf8');
    const client = await pgPool.connect();
    try {
      await client.query('BEGIN');
      await client.query(sql);
      await client.query('INSERT INTO schema_migrations(version) VALUES ($1)', [version]);
      await client.query('COMMIT');
      logger.info({ version }, 'Applied migration');
    } catch (err) {
      await client.query('ROLLBACK');
      logger.error({ err, version }, 'Migration failed');
      process.exit(1);
    } finally {
      client.release();
    }
  }
  await pgPool.end();
}

main().catch(err => {
  logger.error({ err }, 'Migrator crashed');
  process.exit(1);
});
