import fs from 'fs';
import mysql from 'mysql2/promise';

async function migrate() {
  try {
    const sql = fs.readFileSync('drizzle/0001_broad_husk.sql', 'utf8');
    const statements = sql.split('--> statement-breakpoint').map(s => s.trim()).filter(s => s);
    
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      console.error('DATABASE_URL not set');
      process.exit(1);
    }
    
    const url = new URL(dbUrl);
    const connection = await mysql.createConnection({
      host: url.hostname,
      user: url.username,
      password: url.password,
      database: url.pathname.slice(1),
      waitForConnections: true,
      connectionLimit: 1,
      queueLimit: 0,
      ssl: { rejectUnauthorized: false }
    });
    
    for (const stmt of statements) {
      if (stmt.length > 0) {
        console.log('Executing:', stmt.substring(0, 50) + '...');
        await connection.execute(stmt);
      }
    }
    
    await connection.end();
    console.log('✓ Migration completed successfully!');
  } catch (error) {
    console.error('✗ Migration failed:', error.message);
    process.exit(1);
  }
}

migrate();
