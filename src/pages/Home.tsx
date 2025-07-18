import { useEffect, useState } from "react";
import tickSound from '../assets/tick.mp3';

import ModalForm from '../components/ModalForm'

import {
  Modal,
  ModalHeader,
  ModalBody,
  /*
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
  */
} from "reactstrap";


// Types
type ToDoItemProps = {
  id: number;
  itemName: string;
  priority: number;
  isDone: boolean;
  dueDate: Date | null; // <- allow null here
  onDelete: (id: number) => void;
};

type TaskFormData = {
  taskName: string;
  priority: string;
  isDone: boolean;
  dueDate: string;
};


type AddTaskButtonProps = {
  handleAddTask: () => void;
};


// Part of old priority dropdown poor design component
/* 
type PriorityDropdownProps = {
  selected: PriorityItem | null;
  onSelect: (item: PriorityItem) => void;
};

type PriorityItem = {
  icon?: string;
  label?: string;
};
*/


//
// Components
function ToDoItem({ id, itemName, priority, isDone, dueDate, onDelete }: ToDoItemProps) {
  return (
    <div className="toDoItem">
      <div className="buttonContainer">
        <button className="button-reset tickToDoButton" onClick={() => onDelete(id)}>

        </button>
      </div>
      <div className="detailsContianer">
        <p>Due: {dueDate ? dueDate.toLocaleDateString() : "No due date"}</p>
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

/* Example of input design - uses reactstrap dropdown component which is custom component not built on top of native input elements and has a custom value type */
/*
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
*/

export default function Home() {
  const [todoItems, setTodoItems] = useState<ToDoItemProps[]>([]);
  const [modal, setModal] = useState(false);


    // Add new task
  const handleFormSubmit = (formData:TaskFormData) => {
  const newTask: ToDoItemProps = {
    id: Date.now(),
    itemName: formData.taskName,
    priority: parseInt(formData.priority?.slice(1) || "3"),
    isDone: false,
    dueDate: formData.dueDate ? new Date(formData.dueDate) : null,
    onDelete: handleDeleteTask
  };

  setTodoItems((prev) => [...prev, newTask]);
  toggle(); // close modal
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
            <ModalForm onSubmit={handleFormSubmit} />
          </ModalBody> 
        </Modal>

        {todoItems.map((item) => (
          <ToDoItem
            key={item.id}
            id={item.id}
            priority={item.priority}
            itemName={item.itemName}
            isDone={item.isDone}
            dueDate={item.dueDate}
            onDelete={handleDeleteTask}
          />
        ))}

        <AddTaskButton handleAddTask={toggle} />

      </div>
    </main>
  );
}
