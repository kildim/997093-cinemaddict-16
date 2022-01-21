import AbstractView from './abstract-view';
import {PERIOD} from '../constants';

const MINUTES_PER_HOUR = 60;
const createStatisticsTemplate = (stats) => (
  `
<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${stats.rank}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${stats.watched}<span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${Math.floor(stats.totalDuration/MINUTES_PER_HOUR)}<span class="statistic__item-description">h</span>${stats.totalDuration % MINUTES_PER_HOUR}<span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${stats.topGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>  
  `
);

export default class Statistics extends AbstractView{
  #chartContainer = null;
  #stats;

  constructor(props) {
    const {generalStats, externalHandlers} = {...props};
    super();
    this.#stats = generalStats;
    this._externalHandlers.changePeriod = externalHandlers.onPeriodChanges;

    const statMenuItems = this.element.querySelectorAll('.statistic__filters-input');
    statMenuItems.forEach((item) => item.addEventListener('change', this.#changePeriod));

    this.#chartContainer = this.element.querySelector('.statistic__chart');
  }

  #changePeriod = (event) => {
    event.preventDefault();
    const period = event.target.value;
    this._externalHandlers.changePeriod(period);
  }

  get chartContainer() {
    return this.#chartContainer;
  }

  get template() {
    return createStatisticsTemplate(this.#stats);
  }
}
