import { Schema, model, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  status: 'in progress' | 'finished';
  projectId: Schema.Types.ObjectId;
  assignedTo?: Schema.Types.ObjectId;
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  status: { type: String, enum: ['in progress', 'finished'], required: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: false },
});

export default model<ITask>('Task', taskSchema);
