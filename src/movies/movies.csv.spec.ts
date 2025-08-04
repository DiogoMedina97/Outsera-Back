import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parser';

describe('Movies CSV file', () => {
  const csvPath = path.join(process.cwd(), 'src', 'seeds', 'movielist.csv');

  it('Should exist', () => {
    expect(fs.existsSync(csvPath)).toBe(true);
  });

  it('Should have valid columns and data', async () => {
    // Winner pode ser vázio, por isso está como false
    const requiredColumns = {
      year: true, title: true, studios: true, producers: true, winner: false,
    };
    const movies: any[] = [];

    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csv({ separator: ';' }))
        .on('data', (row) => movies.push(row))
        .on('end', resolve)
        .on('error', reject);
    });

    expect(movies.length).toBeGreaterThan(0);

    for (const movie of movies) {
      // Colunas obrigatórias
      Object.entries(requiredColumns).forEach(([col, required]) => {
        expect(movie).toHaveProperty(col);
        expect(movie[col]).toBeDefined();
        if (required) expect(movie[col]).not.toEqual('');
      });

      // Ano válido
      const year = parseInt(movie['year'], 10);
      expect(Number.isNaN(year)).toBe(false);

      // Winner válido
      const winner = movie['winner']?.toLowerCase();
      expect(['yes', 'no', ''].includes(winner)).toBe(true);
    }
  });
});
