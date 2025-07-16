import { useForm } from "react-hook-form";

export type ModalFormProps = {
  onSubmit: (data: any) => void;
};

export default function ModalForm({ onSubmit }: ModalFormProps) {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("taskName")} placeholder="Enter task name" />
      <input {...register("priority")} placeholder="Enter priority" />
      <input {...register("dueDate")} placeholder="Enter due date" />
      <input type="submit" /> {/* hidden so you can trigger from parent button if needed */}
    </form>
  );
}