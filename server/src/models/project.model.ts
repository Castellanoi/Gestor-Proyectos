// Project model for MongoDB using Mongoose
import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  createdBy: Types.ObjectId; // Reference to User
}

const ProjectSchema: Schema<IProject> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<IProject>('Project', ProjectSchema);
