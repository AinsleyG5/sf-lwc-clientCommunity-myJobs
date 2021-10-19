import { LightningElement, api, track, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import RECORDTYPEID from '@salesforce/schema/TR1__Job__c.RecordTypeId';
const _FIELDS = [RECORDTYPEID];

export default class RecordTile extends LightningElement {
    @api job;
    @api recordTypeName;
    @track record;
    @track error;

    @wire(getRecord, { recordId: '$job.Id', fields: _FIELDS })
    wiredAccount({ error, data }) {
      if (data) {
        this.record = data;
        console.log('data.recordTypeInfo ', data.recordTypeInfo.name);
        this.recordTypeName = data.recordTypeInfo.name;
        this.error = undefined;
      } else if (error) {
        this.error = error;
        console.log(`recordTile Error: `, error);
        this.record = undefined;
      }
    }

    tileClick() {
        console.log(`tileClick: `, JSON.parse(JSON.stringify(this.job)));
        const job = JSON.parse(JSON.stringify(this.job));
        const event = new CustomEvent('tileclick', {
            // detail contains only primitives
            detail: job
        });
        // Fire the event from c-tile
        this.dispatchEvent(event);
    }
}