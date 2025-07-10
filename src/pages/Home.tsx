import { useEffect, useState } from "react";
import p1Icon from "../assets/p1.svg";
import p2Icon from "../assets/p2.svg";
import p3Icon from "../assets/p3.svg";
import tickSound from '../assets/tick.mp3';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Form,
  Label,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

// Types
type ToDoItemProps = {
  id: number;
  itemName: string;
  priority: number;
  isDone: boolean;
  onDelete: (id: number) => void;
};

type PriorityItem = {
  icon?: string;
  label?: string;
};

type AddTaskButtonProps = {
  handleAddTask: () => void;
};

type PriorityDropdownProps = {
  selected: PriorityItem | null;
  onSelect: (item: PriorityItem) => void;
};



// Components
function ToDoItem({ id, itemName, priority, isDone, onDelete }: ToDoItemProps) {
  return (
    <div className="toDoItem">
      <div className="buttonContainer">
        <button className="button-reset tickToDoButton" onClick={() => onDelete(id)}>

        </button>
      </div>
      <div className="detailsContianer">
        <p>{itemName} - {isDone ? "Done" : "Pending"}</p>
        <p>Priority: {priority}</p>
      </div>

    </div>
  );
}


function AddTaskButton({ handleAddTask }: AddTaskButtonProps) {
  return (
    <button  className='button-reset clickable addTaskButton' onClick={handleAddTask}>
      + Add Item
    </button>
  );
}


function PriorityDropdown({ selected, onSelect }: PriorityDropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        {selected ? (
          <>
            <img src={selected.icon} alt="" style={{ width: 16, marginRight: 5 }} />
            {selected.label}
          </>
        ) : (
          "Select Priority"
        )}
      </DropdownToggle>
      <DropdownMenu>
        {[
          { icon: p1Icon, label: "P1" },
          { icon: p2Icon, label: "P2" },
          { icon: p3Icon, label: "P3" }
        ].map((item) => (
          <DropdownItem key={item.label} onClick={() => onSelect(item)}>
            <img src={item.icon} alt="" style={{ width: 16, marginRight: 5 }} />
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}


export default function Home() {
  const [todoItems, setTodoItems] = useState<ToDoItemProps[]>([]);
  const [modal, setModal] = useState(false);

  // The state of a form
  const [formState, setFormState] = useState<{
    taskName: string;
    priority: PriorityItem | null;
    isDone: boolean;
  }>({
    taskName: '',
    priority: null,
    isDone: false
  });

  // Update form state on input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePriorityChange = (item: PriorityItem) => {
    setFormState((prev) => ({
      ...prev,
      priority: item
    }));
  };

    // Add new task
  const handleCreateTask = () => {
    if (!formState.taskName || !formState.priority) return;

    const newTask: ToDoItemProps = {
      id: Date.now(),
      itemName: formState.taskName,
      priority: parseInt(formState.priority.label?.slice(1) || "3"), // Extract number from "P1"
      isDone: formState.isDone,
      onDelete: handleDeleteTask
    };

    setTodoItems((prev) => [...prev, newTask]);

    // Reset form and close modal
    setFormState({ taskName: '', priority: null, isDone: false });
    toggle();
  };

  const handleDeleteTask = (idToDelete: number) => {
  // Tick Sound Feedback
  const clickSound = new Audio(tickSound);
  clickSound.play();

  const updatedItems = todoItems.filter(item => item.id !== idToDelete);
  setTodoItems(updatedItems);
  console.log(`Item ID: `,{idToDelete})
  console.log('Item Deleted')
};




  const toggle = () => setModal(!modal);

  // Load data from localStorage
  useEffect(() => {
    const data = localStorage.getItem("toDoListContainer");
    if (data) {
      const storedData = JSON.parse(data);
      if (storedData && storedData.toDoList) {
        setTodoItems(storedData.toDoList);
      }
    }
  }, []);

  // Save to localStorage when todoItems change
  useEffect(() => {
    localStorage.setItem("toDoListContainer", JSON.stringify({ toDoList: todoItems }));
  }, [todoItems]);



  return (
    <main>
      <div className="todoListContainer">
        <h1 className="todoTitle">ToDo List</h1>
        <div className="screenDivider"></div>

      

        <Modal isOpen={modal} toggle={toggle} centered>
          <ModalHeader toggle={toggle}>New Task</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="taskName">Task Name</Label>
                <Input
                  id="taskName"
                  name="taskName"
                  placeholder="Enter name of the task"
                  type="text"
                  value={formState.taskName}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Priority</Label>
                <PriorityDropdown selected={formState.priority} onSelect={handlePriorityChange} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleCreateTask}>Create</Button>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>

        {todoItems.map((item) => (
          <ToDoItem
            key={item.id}
            id={item.id}
            priority={item.priority}
            itemName={item.itemName}
            isDone={item.isDone}
            onDelete={handleDeleteTask}
          />
        ))}

        <AddTaskButton handleAddTask={toggle} />

      </div>
    </main>
  );
}
