// This is a base model class that can be extended by other models
export class BaseModel {
  id: string | number; // Unique identifier for the model
  created_at?: Date | null; // Date when the model was created
  updated_at?: Date | null; // Date when the model was last updated
  deleted_at?: string | null; // Date when the model was soft deleted
}
