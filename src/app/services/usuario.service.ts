import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Usuario } from '../entidades/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  private dbPath = '/usuarios';
  userRef: AngularFirestoreCollection<Usuario>;

  constructor(private db: AngularFirestore) {    
    this.userRef = db.collection(this.dbPath); 
  }

  getAll(): AngularFirestoreCollection<Usuario> {
    return this.userRef;
  }

  getById(id: string): Observable<any> {
    return this.userRef.doc(id).valueChanges();
  }

  create(usuario: Usuario): any {
    return this.userRef.add(usuario);
  }

  update(id: string, usuario: Usuario): Promise<void> {
    return this.userRef.doc(id).update(usuario);
  }

  delete(id: string): Promise<void> {
    return this.userRef.doc(id).delete();
  }
}