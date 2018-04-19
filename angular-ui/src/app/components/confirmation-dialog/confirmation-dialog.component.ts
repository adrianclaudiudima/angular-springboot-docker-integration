import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  confirmationMessage: string;
  ok: string;
  cancel: string;

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.confirmationMessage = data.confirmationMessage;
    this.ok = data.ok;
    this.cancel = data.cancel;
  }

  dialogAccepted(isAccepted) {
    this.dialogRef.close(isAccepted);
  }

}
