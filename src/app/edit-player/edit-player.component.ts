import { Component, Inject } from '@angular/core';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [
    NgFor,
    NgStyle,
    NgIf,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss'
})
export class EditPlayerComponent {

  allProfilePictures = ['1.webp', '2.png', 'monkey.png', 'pinguin.svg', 'serious-woman.svg', 'winkboy.svg']

  constructor(
    public dialogRef: MatDialogRef<EditPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}


