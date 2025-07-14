import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'musculation' })
  specialty: string;

  @Prop()
  imgsrc?: string;

  @Prop({ default: Date.now })
  inscription: Date;

  @Prop({ default: Date.now })
  subscribe: Date;

  @Prop({
    default: function () {
      const deadline = new Date(this.subscribe || Date.now());
      deadline.setDate(deadline.getDate() + 30);
      return deadline;
    },
  })
  subscribeDeadline: Date;

  @Prop({
    enum: ['user', 'admin', 'reception'],
    default: 'user',
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
