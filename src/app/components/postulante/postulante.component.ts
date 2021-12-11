import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Postulante } from 'src/app/Model/Postulante';
import { PostulanteService } from 'src/app/services/postulante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-postulante',
  templateUrl: './postulante.component.html',
  styleUrls: ['./postulante.component.css']
})
export class PostulanteComponent implements OnInit {
  modalReference?: NgbModalRef;

  public postulantes?: Postulante[];
  public postulante?: Postulante;

  fechaRevision = new Date();

  page = 1;
  pageSize = 9;
  collectionSize = 0;

  constructor(private postulanteService: PostulanteService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.consultarPostulante();
  }

  consultarPostulante() {
    console.log('Consultando postulantes');
    this.postulanteService.consultarPostulante().subscribe(response => {
      console.log(response);
      this.postulantes = response;
      this.collectionSize = this.postulantes.length;
      this.postulantes = this.postulantes.map((anime, i) => ({ counter: i + 1, ...anime }))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    });
  }

  guardarPostulante(postulante: Postulante){

    if (!postulante.id) {
      console.log(this.postulante?.id);
    } else {
      Swal.fire({
        title: "Confirmación",
        text: `¿Estás seguro de seleccionar al postulante ${postulante.nombre} para que continúe con el proceso de selección?`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          postulante.fechaPostula = this.fechaRevision;
          postulante.estado = "APROBADO";
          this.postulanteService.actualizarPostulante(postulante).subscribe(response => {
            this.consultarPostulante();
          });
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Ok!',
            text: `El postulante ${postulante.nombre} fue aprobado correctamente. Se le envió una notificaciónm vía e-mail.`,
            showConfirmButton: false,
            timer: 2000
          })
        }
      })
    }
  }

  mostrarVentanaEliminar(postulante: Postulante){
    Swal.fire({
      title: "Confirmación",
      text: `¿Estás seguro de eliminar al postulante ${postulante.nombre} del proceso de selección?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.postulanteService.eliminarPostulante(postulante.id!).subscribe(response => {
          this.consultarPostulante();
        });
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Ok!',
          text: `El postulante ${postulante.nombre} fue eliminado correctamente del proceso de selección. Se le envió una notificaciónm vía e-mail.`,
          showConfirmButton: false,
          timer: 3000
        })
      }
    })
  }

}
