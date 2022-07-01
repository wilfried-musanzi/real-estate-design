import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(User, () => {
  return {
    email: 'user@user.com',
    password: '123456',
  }
}).build()
