import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore'
import { firestore } from 'firebase/app';

@Injectable({
        providedIn: 'root'
    }
)

export class Crud {

    constructor(
        private firestore: AngularFirestore
    ){}

    //Methods go here
    //For the create record it needs to be under client id
    create_new_module(rec_id, record){
        return this.firestore.doc('devices/' + rec_id).set(record)
    }

    read_data(rec_id){
        return this.firestore.collection('devices').doc(rec_id).get();
    }

    update_module(rec_id, record){
        this.firestore.doc('devices/' + rec_id).update(record);
    }

    delete_module(rec_id){
        this.firestore.doc('devices/' + rec_id).delete();
    }

    read_hist_data(rec_id){
        return this.firestore.collection('devices').doc(rec_id).collection('data_history').get()                                
    }

    create_arr(trial)
    { 

        this.firestore.collection('users').doc('ZtUqNxhDByYPiBU4xNhPdUF1hNi2').set(trial,{
            merge:true
        })
    }

    create_object(vary)
    {
        
        this.firestore.collection('users').doc('ZtUqNxhDByYPiBU4xNhPdUF1hNi2').update({
            linked_devices: firestore.FieldValue.arrayUnion(vary)
        })
    }

    read_linked_devices(doc_id)
    {
        return this.firestore.collection('users').doc(doc_id).get()
    }

    delete_linked_device(vary)
    {
        this.firestore.collection('users').doc('ZtUqNxhDByYPiBU4xNhPdUF1hNi2').update({
            linked_devices: firestore.FieldValue.arrayRemove(vary)
        })
    }
}
