'use strict'

const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const db = require('APP/db')

const User = db.define('users', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  email: {
    type: Sequelize.STRING,
    validate: {
			isEmail: true,
			notEmpty: true,
		}
  },
  phone_number: Sequelize.STRING,
  shipping_address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  billing_address: {
    type: Sequelize.STRING,
    allowNull: false
  },

  // We support oauth, so users may or may not have passwords. Huh???
  password_digest: Sequelize.STRING,
	password: {
    type: Sequelize.VIRTUAL,
    allowNull: false
  },
}, {
	indexes: [{fields: ['email'], unique: true,}],
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword,
  },
  instanceMethods: {
    authenticate(plaintext) {
      return new Promise((resolve, reject) =>
        bcrypt.compare(plaintext, this.password_digest,
          (err, result) =>
            err ? reject(err) : resolve(result))
        )
    }
  }
})

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase()
  if (!user.password) return Promise.resolve(user)

  return new Promise((resolve, reject) =>
	  bcrypt.hash(user.get('password'), 10, (err, hash) => {
		  if (err) reject(err)
		  user.set('password_digest', hash)
      resolve(user)
	  })
  )
}

module.exports = User
