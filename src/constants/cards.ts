import { ICard } from '../interfaces/card'

export const CARDS: ICard[] = [
  {
    name: '0',
    score: 0,
    imgSrc: '/img/0.png',
  },
  {
    name: '1',
    score: 1,
    imgSrc: '/img/1.png',
  },
  {
    name: '2',
    score: 2,
    imgSrc: '/img/2.png',
  },
  {
    name: '3',
    score: 3,
    imgSrc: '/img/3.png',
  },
  {
    name: '4',
    score: 4,
    imgSrc: '/img/4.png',
  },
  {
    name: '5',
    score: 5,
    imgSrc: '/img/5.png',
  },
  {
    name: '6',
    score: 6,
    imgSrc: '/img/6.png',
  },
  {
    name: '7',
    score: 7,
    imgSrc: '/img/7.png',
  },
  {
    name: '8',
    score: 8,
    imgSrc: '/img/8.png',
  },
  {
    name: '9',
    score: 9,
    imgSrc: '/img/9.png',
  },
  {
    name: 'ワイルド',
    score: 50,
    imgSrc: '/img/wild.png',
  },
  {
    name: 'ドローフォー',
    fallbackList: ['ドロー4'],
    score: 50,
    imgSrc: '/img/draw4.png',
  },
  {
    name: 'ドローツー',
    fallbackList: ['ドロー2'],
    score: 20,
    imgSrc: '/img/draw2.png',
  },
  {
    name: 'リバース',
    score: 20,
    imgSrc: '/img/reverse.png',
  },
  {
    name: 'スキップ',
    score: 20,
    imgSrc: '/img/skip.png',
  },
]
