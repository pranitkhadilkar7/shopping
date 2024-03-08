import { ValidationOptions, isEmail, registerDecorator } from 'class-validator'

export function IsNotEmail(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any) {
          return typeof value === 'string' && !isEmail(value)
        },
      },
    })
  }
}
