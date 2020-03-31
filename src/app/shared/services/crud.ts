import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore'

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
}
