import { LightningElement, api, track, wire } from 'lwc';

export default class AccordianForEach extends LightningElement {
    @api objectdata;
    requested = false;
    requestedMessage = '';
    @track candidateCV;


    handleRequest(event) {
        this.requested = true;
        this.requestedMessage = "Thank you, the candidate has been notified of your request via their preferred contact method."
        console.log(`Event detail from request click: `, event);
        console.log(this.requested);
    }

    @track isModalOpen = false;
    
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        this.isModalOpen = false;
    }
}