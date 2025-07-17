import { useForm } from "react-hook-form";

export type ModalFormProps = {
  onSubmit: (data: any) => void;
};

export default function ModalForm({ onSubmit }: ModalFormProps) {
  const { register, handleSubmit } = useForm();

  return (
<form onSubmit={handleSubmit(onSubmit)}>
  <div className="modalFormContainer">

    <div className="formGroup">
      <label>Task Name</label>
      <input {...register("taskName")} placeholder="Enter task name" />
    </div>

    <div className="formGroup">
      <label>Priority</label>
      <select {...register("priority")} className="form-control">
        <option value="">Select Priority</option>
        <option value="P1">P1</option>
        <option value="P2">P2</option>
        <option value="P3">P3</option>
      </select>
    </div>

    <div className="formGroup">
      <label>Due Date</label>
      <input {...register("dueDate")} type="date" placeholder="Enter due date" />
    </div>

    <input type="submit" value="Create Task"/>
    
  </div>
</form>
  );
}