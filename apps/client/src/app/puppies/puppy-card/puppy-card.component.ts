import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Puppy } from '../puppy.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-puppy-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './puppy-card.component.html',
  styleUrl: './puppy-card.component.scss',
})
export class PuppyCardComponent {
  @Input() puppy!: Puppy;
}
