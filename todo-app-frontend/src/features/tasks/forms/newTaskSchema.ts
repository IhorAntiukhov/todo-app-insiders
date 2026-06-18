import * as zod from "zod";
import formErrorMessages from "../../auth/constants/formErrorMessages";

export const newTaskSchema = zod.object({
  name: zod.string(formErrorMessages.fieldRequired),
  description: zod.string().min(0),
});

export interface NewTaskFormValues {
  name: string;
  description: string;
}
