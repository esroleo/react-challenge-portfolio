import React, { useState } from 'react';
import { validateEmail } from '../../utils/helpers';

import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

//mailer
// npm install emailjs-com --save
import emailjs from "emailjs-com";



function ContactForm() {

    // hook that will manage the form data as a controlled compoennt
    //const [formState, setFormState] = useState();
    const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });

    // hook to validate error message of the form
    const [errorMessage, setErrorMessage] = useState('');

    // Show Modal after submitting form
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    // deconstruct formState
    const { name, email, subject, message } = formState;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!errorMessage) {
          setFormState({ [e.target.name]: e.target.value });
          //console.log('Form', formState);
          sendEmail(e)
          handleShow()
          console.log(e.target.message)
          setFormState({ name: '', email: '', subject: '', message: '' });
          e.target.reset()
          
         }
      };


    // Manage form validation
    const handleChange = (e) => {
        if (e.target.name === 'email') {
            const isValid = validateEmail(e.target.value);
            //xor logic
            if (!isValid) {
            setErrorMessage('Your email is invalid.');
            } else { // No error
            setErrorMessage('');
            }
        } else {
            if (!e.target.value.length) {
                // .name is the attribute of the html tag
            setErrorMessage(`${e.target.name} is required.`);
            } else {
               setErrorMessage('');
            }
        }
        //console.log('errorMessage', errorMessage); 
        // if form data has passed then assigned correct form state
        if (!errorMessage) {
            // ...formState is to use as is in terms of the variables assigned
            // if there is no error. Change the variable stored to its new value.
            setFormState({ ...formState, [e.target.name]: e.target.value });
            }
    };

    // send email function
    function sendEmail(e) {
        e.preventDefault();
    
        emailjs.sendForm('gmail', 'template_aj3gfi7', e.target, 'user_zs4TMIym9RgkXAzkAAKEz')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          //e.target.reset()
      }

  
    return (

        <> 
        <Container>

        <Form id="contact-form" onSubmit={handleSubmit}>

            <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" defaultValue={name} onBlur={handleChange} size="lg" type="name" placeholder="Enter name" />
                <Form.Text className="text-muted">
                
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" defaultValue={email} onBlur={handleChange} size="lg" type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formEmailSubject">
                <Form.Label>Email Subject</Form.Label>
                <Form.Control name="subject" defaultValue={subject} onBlur={handleChange} size="lg" type="text" placeholder="Enter subject" />
                <Form.Text className="text-muted">
                
                </Form.Text>
            </Form.Group>


            <Form.Group controlId="formEmailMessage">
                <Form.Label>Leave me a message</Form.Label>
                <Form.Control name="message" defaultValue={message} onBlur={handleChange} as="textarea" rows={3} />
            </Form.Group>

            {errorMessage && (
                    <div>
                        <p className="error-text">{errorMessage}</p>
                    </div>
            )}

            <Button variant="primary" type="submit">
                Submit
            </Button>
            <Nav variant="tabs" className="justify-content-end" style={{ width: "100%" }}>

                <Nav.Link 
                
                href="https://github.com/esroleo"
                target="_blank"
                >GitHub
                </Nav.Link>
                <Nav.Link 
                href="https://www.linkedin.com/in/esroleo/"
                target="_blank"
                >Linkedin
                </Nav.Link>
                <Nav.Link 
                href="mailto:esroleo@gmail.com"
                >esroleo@gmail.com
                </Nav.Link>

            </Nav>

            </Form>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Your message has been sent!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Esteban will get back to you as soon as possible! 
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
             </Modal>

             

        </Container>
        </>        
             
    )

}
    
export default ContactForm;