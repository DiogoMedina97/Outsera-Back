import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from '../app.module';
import { MoviesModule } from './movies.module';

describe('MoviesModule', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule, MoviesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dataSource = app.get(DataSource);

    await dataSource.runMigrations();

    await Promise.all(
      [1900, 2000].map((year) => {
        return dataSource.query(
          `INSERT INTO movie (year, title, studios, producers, winner) VALUES (?, ?, ?, ?, ?)`,
          [year, "Title", "Studio", "Producer", true],
        );
      }),
    );
  });

  afterAll(async () => {
    await dataSource.dropDatabase();
    await app.close();
  });

  it('Should return the intervals', async () => {
    const response = await request(app.getHttpServer()).get('/movies/maxMinWinIntervalForProducers');
    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        max: expect.any(Array),
        min: expect.any(Array),
      })
    );

    const producers = [...response.body.max, ...response.body.min];

    expect(producers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ producer: "Producer" }),
      ]),
    );
  });
});
