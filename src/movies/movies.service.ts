import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviesService {
  public async getMaxMinWinIntervalForProducers() {
    return "maxMinWinIntervalForProducers";
  }
}
