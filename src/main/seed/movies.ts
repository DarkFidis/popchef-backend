import {movieModel} from "../db/models";

const movies = [
  {
    title: 'Star Wars IX: Ascension de Skywalker',
    description: 'Environ un an après la mort de Luke Skywalker2, la Résistance tente de survivre face au Premier Ordre, désormais mené par un nouveau Suprême Leader, Kylo Ren. Une rumeur agite cependant toute la galaxie : l\'Empereur Palpatine serait de retour. Tandis que Rey s\'entraîne sous la houlette de la générale Leia Organa, Kylo Ren cherche à défier Palpatine, qu\'il considère comme une menace à son pouvoir',
    imgUrl: 'https://fr.web.img6.acsta.net/pictures/20/10/02/12/21/3764004.png',
    releaseYear: '2019',
    length: '142'
  }
]

export const seedDatabase = async () => {
  const promises = movies.map(movie => movieModel.save(movie))
  await Promise.all(promises)
}
