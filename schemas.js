const Joi = require('joi')

const id = Joi.number().integer().min(1).required()
const nameNotRequired = Joi.string().min(2).max(30).allow('')
const nameRequired = Joi.string().min(2).max(30).required()
const birthdayDate = Joi.date().greater('1-1-1920').less('now').allow('', null)
const color = Joi.number().integer().min(1).max(1000).required('')

const familyAddSchema = Joi.object().keys({
  user_id: id,
  family_firstname: nameRequired,
  family_lastname: nameNotRequired,
  family_surname: nameNotRequired,
  family_birthday: birthdayDate,
  color_family_id: color
})

const familyModifySchema = Joi.object().keys({
  id: id,
  family_firstname: nameRequired,
  family_lastname: nameNotRequired,
  family_surname: nameNotRequired,
  family_birthday: birthdayDate,
  color_family_id: color
})

module.exports = {
  '/family-members/new': familyAddSchema,
  '/family-members/update': familyModifySchema
}
