import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parser';

export class SeedMovies1753470893977 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movie',
        columns: [
          { name: 'id', type: 'integer', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'year', type: 'integer' },
          { name: 'title', type: 'varchar' },
          { name: 'studios', type: 'varchar' },
          { name: 'producers', type: 'varchar' },
          { name: 'winner', type: 'boolean', default: false },
        ],
      }),
    );

    const csvPath = path.join(process.cwd(), 'src', 'seeds', 'movielist.csv');
    const movies: any[] = [];

    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csv({ separator: ';' }))
        .on('data', (row) => {
          movies.push({
            year: parseInt(row['year'], 10),
            title: row['title'],
            studios: row['studios'],
            producers: row['producers'],
            winner: row['winner']?.toLowerCase() === 'yes',
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });

    for (const movie of movies) {
      await queryRunner.query(
        `INSERT INTO movie (year, title, studios, producers, winner) VALUES (?, ?, ?, ?, ?)`,
        [movie.year, movie.title, movie.studios, movie.producers, movie.winner],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movie');
  }
}

