import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movies.entity';
import { Repository } from 'typeorm';
import { MovieInterval } from './movies.interface';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ){}

  public async getMaxMinWinIntervalForProducers() {
    const winners = await this.movieRepository.find({ where: { winner: true } });

    const producersMap: Record<string, number[]> = {};
    winners.forEach((movie) => {
      const producers = movie.producers.split(/,|and/).map((p) => p.trim());
      for (const producer of producers) {
        if (!producersMap[producer]) producersMap[producer] = [];
        if (!producersMap[producer].includes(movie.year)) producersMap[producer].push(movie.year);
      }
    });

    const intervals: MovieInterval[] = [];
    for (const producer in producersMap) {
      const years = producersMap[producer].sort((a, b) => a - b);
      if (years.length < 2) continue;

      for (let i = 1; i < years.length; i++) {
        intervals.push({
          producer,
          interval: years[i] - years[i - 1],
          previousWin: years[i - 1],
          followingWin: years[i],
        });
      }
    }

    if (intervals.length === 0) return { min: [], max: [] };

    const intervalsSorted = intervals
      .sort((a, b) => a.interval - b.interval);

    return {
      min: intervalsSorted.slice(0, 2),
      max: intervalsSorted.slice(-2),
    };
  }
}
