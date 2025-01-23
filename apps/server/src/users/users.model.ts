import * as mongoose from 'mongoose';

export const UserSchemaErrorCode = {
  EMAIL_ALREADY_IN_USE: 'EMAIL_ALREADY_IN_USE',
} as const;

export const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: async function (email) {
          const user = await this.constructor.findOne({ email });
          if (user) {
            return this.id === user.id;
          }
          return true;
        },
        message: (props) => UserSchemaErrorCode.EMAIL_ALREADY_IN_USE,
      },
    },
  },
  { timestamps: true }
);

export interface User extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  password: string;
}
