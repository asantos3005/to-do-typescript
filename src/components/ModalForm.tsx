import { useForm } from "react-hook-form";

export type ModalFormProps = {
  onSubmit: (data: any) => void;
};

type FormValues = {
  taskName: string;
  priority: string;
  dueDate: string;
};

export default function ModalForm({ onSubmit }: ModalFormProps) {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="modalFormContainer">
        
        <div className="formGroup">
          <label>Task Name</label>
          <input
            {...register("taskName", { required: "Task name is required", maxLength: { value: 30, message: "Max length is 30 characters" } })}
            placeholder="Enter task name"
          />
          {errors.taskName && <p className="error">{errors.taskName.message}</p>}
        </div>

        <div className="formGroup">
          <label>Priority</label>
          <select
            {...register("priority", { required: "Please select a priority" })}
            className="form-control"
          >
            <option value="">Select Priority</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
            <option value="P3">P3</option>
          </select>
          {errors.priority && <p className="error">{errors.priority.message}</p>}
        </div>

        <input
          type="date"
          placeholder="Enter due date"
          {...register("dueDate", {
            required: "Due date is required",
            validate: (value) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0); 
              const selectedDate = new Date(value);
              if (selectedDate < today) {
                return "Due date cannot be in the past";
              }
              return true;
            },
          })}
        />
        {errors.dueDate && <p className="error">{errors.dueDate.message}</p>}

        <input type="submit" value="Create Task" />
      </div>
    </form>
  );
}