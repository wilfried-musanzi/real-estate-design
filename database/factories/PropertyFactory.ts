import Property from 'App/Models/Property'
import Factory from '@ioc:Adonis/Lucid/Factory'
import CategoryFactory from './CategoryFactory'

export default Factory.define(Property, ({ faker }) => {
  return {
    title: faker.company.companyName(),
    description: faker.lorem.sentences(2),
    town: faker.address.cityName(),
    price: faker.datatype.number({ min: 500, max: 1000 }),
    surface: faker.datatype.number({ min: 50, max: 100 }),
  }
})
  .relation('category', () => CategoryFactory)
  .build()
