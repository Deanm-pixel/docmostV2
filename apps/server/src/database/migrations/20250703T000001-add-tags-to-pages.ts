import { sql } from 'kysely';
import { Kysely } from 'kysely';

export async function up(db: Kysely<any>) {
  await db.schema
    .alterTable('pages')
    .addColumn('tags', 'text[]', (col) => col.defaultTo(sql`ARRAY[]::text[]`))
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema
    .alterTable('pages')
    .dropColumn('tags')
    .execute();
}
