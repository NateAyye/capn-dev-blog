import mongoose, { Schema, model } from 'mongoose';

interface PostProps {
  title: string;
  body: string;
  createdAt: Date;
  views?: number;
  editedAt?: Date;
}

const postSchema = new Schema<PostProps>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    createdAt: { type: Schema.Types.Date, default: Date.now },
    views: {
      type: Number,
      default: 0,
    },
    editedAt: Schema.Types.Date,
  },
  {
    toJSON: {
      getters: true,
    },
  },
);

const Post = mongoose.models?.Post || model<PostProps>('Post', postSchema);

export default Post;
