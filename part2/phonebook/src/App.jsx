import { useEffect, useState } from "react";
import "./App.css";
import Notification from "./components/Notification";
import personService from "./services/persons";

const Persons = ({ persons, setPersons, setAlertType, setAlertMessage }) => {
  const handleDelete = (selected) => {
    if (confirm(`Delete ${selected.name}?`)) {
      personService
        .remove(selected.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== selected.id));
          setAlertType("success");
          setAlertMessage(`Deleted ${selected.name}`);
          setTimeout(() => {
            setAlertType(null);
            setAlertMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setPersons(persons.filter((p) => p.id !== selected.id));
          setAlertType("error");
          setAlertMessage(
            `Information of ${selected.name} has already been deleted from server`
          );
          setTimeout(() => {
            setAlertType(null);
            setAlertMessage(null);
          }, 5000);
        });
    }
  };

  return (
    <>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDelete(person)}>delete</button>
        </div>
      ))}
    </>
  );
};

const PersonForm = ({
  handleSubmit,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      name:{" "}
      <input
        value={newName}
        onChange={(event) => setNewName(event.target.value)}
      />
    </div>
    <div>
      number:{" "}
      <input
        value={newNumber}
        onChange={(event) => setNewNumber(event.target.value)}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Filter = ({ filter, setFilter }) => (
  <div>
    filter show with:{" "}
    <input value={filter} onChange={(event) => setFilter(event.target.value)} />
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const filtered = persons.filter(
    (person) =>
      filter === "" || person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const addPerson = (event) => {
    event.preventDefault();
    const foundByName = persons.find((person) => person.name === newName);
    const foundByNumber = persons.find((person) => person.number === newNumber);

    if (foundByName) {
      updatePerson(foundByName);
    } else if (foundByNumber) {
      alert(`${newNumber} is already added to phonebook`);
    } else if (!newName || !newNumber) {
      alert(`Found empty field`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setAlertType("success");
        setAlertMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setAlertType(null);
          setAlertMessage(null);
        }, 5000);
      });
    }
  };

  const updatePerson = (person) => {
    if (
      confirm(
        `${newName} is already added to phonebook, replace old number with new one?`
      )
    ) {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personService.update(person.id, newPerson).then((returnedPerson) => {
        setPersons(
          persons.map((p) => (p.id !== person.id ? p : returnedPerson))
        );
        setNewName("");
        setNewNumber("");
        setAlertType("success");
        setAlertMessage(`Updated to ${returnedPerson.number}`);
        setTimeout(() => {
          setAlertType(null);
          setAlertMessage(null);
        }, 5000);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={alertType} message={alertMessage} />
      <Filter filter={filter} setFilter={setFilter} />

      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h3>Numbers</h3>
      <Persons
        persons={filtered}
        setPersons={setPersons}
        setAlertType={setAlertType}
        setAlertMessage={setAlertMessage}
      />
    </div>
  );
};

export default App;
