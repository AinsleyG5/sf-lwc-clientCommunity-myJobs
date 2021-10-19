import { LightningElement, api, wire, track } from 'lwc';
import getsObjectDetails from '@salesforce/apex/getJobsClientParam.getJobs';
import getsApplicationDetails from '@salesforce/apex/getApplications.getApps';
import getJobFunctionOptions from '@salesforce/apex/getJobFunctionPicklist.getJobFunctions';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class ReturnRecordData extends LightningElement {
    @api record_ID;
    @api selectedItem;
    @track jobs;
    @track applications;
    @track selectedValue = '';
    @track options = [];
    @track functionOptions = [];
    @track selectedFunction = '';
    app_ID = 'a1C6N000000sYwMUAU';

    @wire(getsObjectDetails, { recordId: '$record_ID', recordType: '$selectedValue' })
    recordObjectData({data, error}) {
        if(data){
            console.log(`data retured from apex class: `, data);
            this.jobs = data;
        } else if(error) {
            window.console.log('Error ===> '+ JSON.stringify(error));
        }
    }

    @wire(getsApplicationDetails, { recordId: '$app_ID' })
    appData({data, error}) {
        if(data){
            console.log(`data retured from getsApplicationDetails: `, data);
            this.applications = data;
        } else if(error) {
            window.console.log('Error ===> '+ JSON.stringify(error));
        }
    }

    @wire(getObjectInfo, { objectApiName: 'TR1__Job__c' })
    accObjectInfo({data, error}) {
        if(data) {
            let optionsValues = [];
            // map of record type Info
            const rtInfos = data.recordTypeInfos;

            // getting map values
            let rtValues = Object.values(rtInfos);

            for(let i = 0; i < rtValues.length; i++) {
                if(rtValues[i].name !== 'Master') {
                    optionsValues.push({
                        label: rtValues[i].name,
                        value: rtValues[i].recordTypeId
                    })
                }
            }

            this.options = optionsValues;
        }
        else if(error) {
            window.console.log('Error ===> '+JSON.stringify(error));
        }
    }

    @wire(getJobFunctionOptions, {})
    jobFunctionObjectData({data, error}) {
        if(data) {
            console.log(`jobFunctionOptions`, data);

            let optionsValues = [];

            data.forEach(e => {
                optionsValues.push({
                    label: e,
                    value: e
                })
            })

            this.functionOptions = optionsValues;

        console.log(`function options: `, this.functionOptions);
        } else if(error) {
            window.console.log(`Error ===> `, JSON.stringify(error));
        }
    }

    handleTileClick(evt) {
        console.log(`This is the evt: `, JSON.stringify(evt.detail));
        // const job = JSON.parse(JSON.stringify(evt.detail));
        // const event = new CustomEvent('productselected', {
        //     detail: job
        // });
        // this.dispatchEvent(event);
        this.selectedItem =  JSON.parse(JSON.stringify(evt.detail));
        if(evt.detail.Id) {
            this.app_ID = evt.detail.Id;
        }
    }

    handleChange(event) {
        this.selectedValue = event.detail.value;
    }

    handleFunctionChange(event) {
        this.selectedFunction = event.detail.value;
    }
}