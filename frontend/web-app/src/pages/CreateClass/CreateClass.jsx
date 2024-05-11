import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
import { Modal, Button, Form } from 'react-bootstrap';

const CreateClass = () => {
  const [showModal, setShowModal] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDegree, setEventDegree] = useState(''); 
  const [eventType, setEventType] = useState('');
  const [eventDepartment, setEventDepartment] = useState('');
  const [eventStart, setEventStart] = useState('');
  const [eventEnd, setEventEnd] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  const openModal = () => {
    setShowModal(true);
    const currentDate = new Date().toISOString().slice(0, 16);
    setEventStart(currentDate);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setEventTitle('');
    setEventDegree(''); 
    setEventType('');
    setEventDepartment('');
    setEventStart('');
    setEventEnd('');
    setEventDescription('');
    setSelectedEvent(null);
  };

  const saveEvent = () => {
    if (selectedEvent) {
      const updatedEvents = events.map(event =>
        event.id === selectedEvent.id ? { ...event, title: eventTitle, type: eventDegree, degree: eventType, Department: eventDepartment, start: eventStart, end: eventEnd, description: eventDescription } : event
      );
      setEvents(updatedEvents);
    } else {
      const newEvent = {
        id: events.length + 1,
        title: eventTitle,
        type: eventDegree,
        degree: eventType,
        Department: eventDepartment,
        start: eventStart,
        end: eventEnd,
        description: eventDescription
      };
      setEvents([...events, newEvent]);
    }
    closeModal();
  };

  const deleteEvent = () => {
    const updatedEvents = events.filter(event => event.id !== selectedEvent.id);
    setEvents(updatedEvents);
    closeModal();
  };

  const handleEventClick = (info) => {
    console.log('Selected Event:', info.event);
    setSelectedEvent(info.event);
    setEventTitle(info.event.title);
    setEventDegree(info.event.extendedProps.type || ''); 
    setEventType(info.event.extendedProps.degree || '');
    setEventDepartment(info.event.extendedProps.Department || '');
    setEventStart(info.event.start.toISOString().slice(0, 16));
    setEventEnd(info.event.end ? info.event.end.toISOString().slice(0, 16) : '');
    setEventDescription(info.event.extendedProps.description || '');
    openModal();
  };

  const handleCustomAction = () => {
    // Implement custom action here
    console.log('Custom action executed');
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <div>
            <Fullcalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={"dayGridMonth"}
              headerToolbar={{
                start: "today prev,next",
                center: "title",
                end: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              height={"60vh"}
              events={events}
              eventClick={handleEventClick}
            />
          </div>
          <div className="flex justify-center items-center h-full">
            <Link to="#" onClick={openModal}><strong>Create class</strong></Link>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent ? "Edit Event" : "Create Event"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="eventTitle">
              <Form.Label>Class title</Form.Label>
              <Form.Control type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="eventDegree">
              <Form.Label>Degree</Form.Label>
              <Form.Control as="select" value={eventDegree} onChange={(e) => setEventDegree(e.target.value)}>
                <option value="">Select degree...</option>
                <option value="it">Master</option>
                <option value="gr">Undergraduate</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="eventType">
              <Form.Label>Type</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  label="Lecture"
                  checked={eventType === 'lecture'}
                  onChange={(e) => setEventType(e.target.checked ? 'lecture' : '')}
                />
                <Form.Check
                  type="checkbox"
                  label="Exercises"
                  checked={eventType === 'exercises'}
                  onChange={(e) => setEventType(e.target.checked ? 'exercises' : '')}
                />
              </div>
            </Form.Group>
            <Form.Group controlId="eventDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Control as="select" value={eventDepartment} onChange={(e) => setEventDepartment(e.target.value)}>
                <option value="">Select department...</option>
                <option value="IT">IT</option>
                <option value="GR">GR</option>
                <option value="MA">MA</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="eventDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="eventStart">
              <Form.Label>Start</Form.Label>
              <Form.Control type="datetime-local" value={eventStart} onChange={(e) => setEventStart(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="eventEnd">
              <Form.Label>End</Form.Label>
              <Form.Control type="datetime-local" value={eventEnd} onChange={(e) => setEventEnd(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          {selectedEvent && (
            <Button variant="danger" onClick={deleteEvent}>
              Delete Event
            </Button>
          )}
          {selectedEvent && (
            <Link to="/ClassDashboard">
              <Button variant="primary">
                Dashboard
              </Button>
            </Link>
          )}
          <Button variant="primary" onClick={saveEvent}>
            {selectedEvent ? "Update Event" : "Save Event"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateClass;
