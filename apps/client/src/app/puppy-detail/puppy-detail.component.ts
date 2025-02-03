import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PuppyService } from '../puppies/puppy.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-puppy-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './puppy-detail.component.html',
  styleUrls: ['./puppy-detail.component.scss'],
})
export class PuppyDetailComponent implements OnInit {
  puppy: any;

  constructor(
    private route: ActivatedRoute,
    private puppyService: PuppyService
  ) {}

  ngOnInit(): void {
    const refId = this.route.snapshot.paramMap.get('refId');
    if (refId) {
      this.puppyService.getPuppy(refId).subscribe((data) => {
        this.puppy = data;
      });
    } else {
      console.error('refId is null');
    }
  }
}
